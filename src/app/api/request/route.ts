import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { sendAdminRequestEmail } from "@/lib/mail";
interface RequestData {
  id?: number;
  name: string;
  email: string;
  address: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM requests ORDER BY created_at DESC"
    );

    return NextResponse.json(
      {
        success: true,
        requests: rows,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("FETCH REQUEST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch requests",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: RequestData = await request.json();

    const { name, email, address, description } = body;

    if (!name || !email || !address || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, address and description are required",
        },
        { status: 400 }
      );
    }

    const [result] = await pool.query<ResultSetHeader>(
      `
  INSERT INTO requests (
    name,
    email,
    address,
    description
  )
  VALUES (?, ?, ?, ?)
  `,
      [name, email, address, description]
    );

    // Send email to admin
    try {
      await sendAdminRequestEmail({
        name,
        email,
        address,
        description,
      });
    } catch (err) {
      console.error("Mail Error:", err);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Request created successfully",
        requestId: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE REQUEST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create request",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "ID is required",
      });
    }

    await pool.query(
      "DELETE FROM requests WHERE id = ?",
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}