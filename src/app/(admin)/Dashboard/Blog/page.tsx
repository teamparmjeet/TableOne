"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { CalendarDays, MapPin, Plus, X, ChevronDown } from "lucide-react";
import React from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

type Blog = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
};

export default function page() {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    category: "",
  });

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog?admin=true", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setForm({
          title: "",
          date: "",
          location: "",
          description: "",
          category: "",
        });

        setOpen(false);
        fetchBlogs();
      } else {
        alert(data.message || "Failed to create blog");
      }
    } catch (error) {
      console.error("Create blog error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id: number) => {
    if (!confirm("Delete this blog?")) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        fetchBlogs();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleUpdateBlog = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`/api/blog/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingId,
          ...form,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setEditingId(null);

        setForm({
          title: "",
          date: "",
          location: "",
          description: "",
          category: "",
        });

        setOpen(false);

        fetchBlogs();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);

    setForm({
      title: blog.title,
      date: blog.date.split("T")[0],
      location: blog.location,
      description: blog.description,
      category: blog.category,
    });

    setOpen(true);
  };

  return (
    <div className="min-h-screen text-[#36473F]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 flex flex-col gap-4 rounded border border-[#36473F]/10 bg-white/60 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C6603F]">
              Blog Manager
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#36473F]">
              Blogs
            </h1>
            <p className="mt-1 text-sm text-[#36473F]/60">
              Add and manage rich text blog entries.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingId(null);

              setForm({
                title: "",
                date: "",
                location: "",
                description: "",
                category: "",
              });

              setOpen(true);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#B54323] px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#36473F] sm:w-auto"
          >
            <Plus size={18} />
            Add Blog
          </button>
        </div>

        {blogs.length === 0 ? (
          <div className="rounded border border-dashed border-[#36473F]/20 bg-white/50 p-10 text-center">
            <h2 className="text-xl font-bold text-[#36473F]">
              No blogs added yet
            </h2>
            <p className="mt-2 text-sm text-[#36473F]/60">
              Click Add Blog to create your first blog.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded border border-[#36473F]/10 bg-white/70 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-225 text-left">
                <thead className="bg-[#36473F] text-white">
                  <tr>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.2em]">
                      Title
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.2em]">
                      Date
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.2em]">
                      Location
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.2em]">
                      Category
                    </th>
                    <th className="px-5 py-4 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {blogs.map((blog, index) => {
                    const isOpen = openRow === blog.id;

                    return (
                      <React.Fragment key={blog.id}>
                        <tr
                         
                          className="border-b border-[#36473F]/10 transition hover:bg-[#F0EEE5]/70"
                        >
                          <td className="px-5 py-4">
                            <p className="font-bold text-[#36473F]">{blog.title}</p>
                          </td>

                          <td className="px-5 py-4 text-sm text-[#36473F]/70">
                            <div className="flex items-center gap-2">
                              <CalendarDays size={15} className="text-[#C6603F]" />
                              {new Date(blog.date).toISOString().split("T")[0]}
                            </div>
                          </td>

                          <td className="px-5 py-4 text-sm text-[#36473F]/70">
                            <div className="flex items-center gap-2">
                              <MapPin size={15} className="text-[#C6603F]" />
                              {blog.location}
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-full bg-[#C6603F]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#B54323]">
                              {blog.category}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">

                              <button
                                onClick={() => handleEdit(blog)}
                                className="rounded bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(blog.id)}
                                className="rounded bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                              >
                                Delete
                              </button>

                              <button
                                onClick={() => setOpenRow(isOpen ? null : blog.id)}
                                className="rounded bg-[#36473F] px-3 py-2 text-xs font-semibold text-white"
                              >
                                View
                              </button>

                            </div>
                          </td>
                        </tr>

                        {isOpen && (
                          <tr className="border-b border-[#36473F]/10 bg-[#F0EEE5]/60">
                            <td colSpan={5} className="px-5 py-5">
                              <div className="rounded bg-white/70 p-5">
                                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#C6603F]">
                                  Description
                                </p>

                                <div
                                  className="prose prose-sm max-w-none text-[#36473F]"
                                  dangerouslySetInnerHTML={{
                                    __html: blog.description,
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-3xl rounded bg-[#F0EEE5] p-5 shadow-2xl sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C6603F]">
                  {editingId ? "Update Blog" : "New Blog"}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#36473F]">
                  {editingId ? "Edit Blog" : "Add Blog"}
                </h2>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#36473F] transition hover:bg-[#B54323] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={
                editingId
                  ? handleUpdateBlog
                  : handleAddBlog
              }
              className="space-y-4">
              <input
                type="text"
                required
                placeholder="Blog title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full rounded border border-[#36473F]/10 bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#C6603F]"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                  className="w-full rounded border border-[#36473F]/10 bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#C6603F]"
                />

                <input
                  type="text"
                  required
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full rounded border border-[#36473F]/10 bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#C6603F]"
                />
              </div>

              <input
                type="text"
                required
                placeholder="Location"
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
                className="w-full rounded border border-[#36473F]/10 bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#C6603F]"
              />

              <div className="rounded bg-white overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={form.description}
                  onChange={(value) =>
                    setForm({ ...form, description: value })
                  }
                  className="min-h-55"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#B54323] px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#36473F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? editingId
                    ? "Updating..."
                    : "Saving..."
                  : editingId
                    ? "Update Blog"
                    : "Save Blog"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}