import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Blog {
  id?: number;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export async function GET(req: NextRequest) {
  try {
    const isAdmin = req.nextUrl.searchParams.get("admin") === "true";

    const query = isAdmin
      ? "SELECT * FROM blogs ORDER BY created_at DESC"
      : "SELECT * FROM blogs ORDER BY created_at DESC LIMIT 6";

    const [rows] = await pool.query<RowDataPacket[]>(query);

    return NextResponse.json(
      {
        success: true,
        blogs: rows,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("FETCH BLOG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Blog = await request.json();

    const { title, date, location, description, category } = body;

    if (!title || !date || !location || !description || !category) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title, date, location, description and category are required",
        },
        { status: 400 }
      );
    }

    const [result] = await pool.query<ResultSetHeader>(
      `
      INSERT INTO blogs (
        title,
        date,
        location,
        description,
        category
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, date, location, description, category]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        blogId: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
      },
      { status: 500 }
    );
  }
}