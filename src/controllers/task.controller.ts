import { Request, Response } from "express";
import { Task } from "../models/task.model";
import { catchAsync } from "../middleware/catchAsync";
import { AppError } from "../utils/AppError";

interface QueryString {
  page?: string;
  limit?: string;
  status?: string;
  sortBy?: string;
  search?: string;
}

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: { task },
  });
});

export const getTasks = catchAsync(async (req: Request, res: Response) => {
  const {
    page = "1",
    limit = "10",
    status,
    sortBy,
    search,
  } = req.query as QueryString;

  // Build query
  const query: any = { userId: req.user._id };
  if (status) query.status = status;
  if (search) query.title = { $regex: search, $options: "i" };

  // Build sort options
  const sortOptions: any = {};
  if (sortBy) {
    const [field, order] = sortBy.split(":");
    sortOptions[field] = order === "desc" ? -1 : 1;
  } else {
    sortOptions.createdAt = -1;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [tasks, total] = await Promise.all([
    Task.find(query).sort(sortOptions).skip(skip).limit(parseInt(limit)),
    Task.countDocuments(query),
  ]);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    },
  });
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  res.status(200).json({
    status: "success",
    data: { task },
  });
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
