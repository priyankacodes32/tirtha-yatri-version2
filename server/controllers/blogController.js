import asyncHandler from '../utils/asyncHandler.js';
import ApiFeatures from '../utils/apiFeatures.js';
import validateCategory from '../utils/validateCategory.js';
import Blog from '../models/Blog.js';

// @desc    List blog posts — public sees only published, admin sees all
// @route   GET /api/blogs
// @access  Public / Private(admin, via ?all=true)
export const getBlogs = asyncHandler(async (req, res) => {
  const isAdminRequest = req.user?.role === 'admin' && req.query.all === 'true';
  const baseFilter = isAdminRequest ? {} : { published: true };
  if (req.query.featured === 'true') baseFilter.isFeatured = true;
  const baseQuery = Blog.find(baseFilter);

  const features = new ApiFeatures(baseQuery, req.query, baseFilter)
    .filter(['category'])
    .search(['title', 'excerpt', 'content'])
    .sort('-publishedAt')
    .paginate();

  const [data, count] = await Promise.all([
    features.query,
    features.countDocuments(Blog),
  ]);

  res.json({
    success: true,
    count,
    page: features.page,
    pages: Math.ceil(count / features.limit) || 1,
    data,
  });
});

// @desc    Get a single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });

  if (!blog || (!blog.published && req.user?.role !== 'admin')) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  res.json({ success: true, data: blog });
});

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = asyncHandler(async (req, res) => {
  await validateCategory('blog', req.body.category);
  const blog = await Blog.create(req.body);
  res.status(201).json({ success: true, data: blog });
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  if (req.body.category) await validateCategory('blog', req.body.category);

  Object.assign(blog, req.body);
  await blog.save();

  res.json({ success: true, data: blog });
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  await blog.deleteOne();
  res.json({ success: true, data: {} });
});
