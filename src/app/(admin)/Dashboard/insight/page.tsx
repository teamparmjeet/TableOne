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
  const [filters, setFilters] = useState({
    title: "",
    year: "",
    month: "",
    location: "All",
    category: "All",
  });

  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((blog) => blog.category))),
  ];

  const locations = [
    "All",
    ...Array.from(new Set(blogs.map((blog) => blog.location))),
  ];

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = Array.from(
    new Set(
      blogs.map((blog) => new Date(blog.date).getFullYear())
    )
  ).sort((a, b) => b - a);

  const filteredBlogs = blogs.filter((blog) => {
    const blogDate = blog.date.split("T")[0];
    const blogYear = blogDate.slice(0, 4);
    const blogMonth = blogDate.slice(5, 7);

    const matchTitle = blog.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());

    const matchYear =
      !filters.year || blogYear === filters.year;

    const matchMonth =
      !filters.month || blogMonth === filters.month;

    const matchCategory =
      filters.category === "All" ||
      blog.category === filters.category;

    const matchLocation =
      filters.location === "All" ||
      blog.location === filters.location;

    return (
      matchTitle &&
      matchYear &&
      matchMonth &&
      matchCategory &&
      matchLocation
    );
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
      console.error("Fetch Insight error:", error);
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
        alert(data.message || "Failed to create Insight");
      }
    } catch (error) {
      console.error("Create Insight error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id: number) => {
    if (!confirm("Delete this Insight?")) return;

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
              Admin Panel
            </p>
            <h1 className="Title2 leading-none text-[#202A44] ">

              Insight
            </h1>

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
            Add Insight
          </button>
        </div>
        <div className="mb-5 rounded-xl border border-[#36473F]/10 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#202A44]">
              Filter Insights
            </h3>

            <button
              onClick={() =>
                setFilters({
                  title: "",
                  year: "",
                  month: "",
                  location: "All",
                  category: "All",
                })
              }
              className="rounded-full bg-[#B54323]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#B54323] transition hover:bg-[#B54323] hover:text-white"
            >
              Reset
            </button>
          </div>


          <div className="grid gap-4 md:grid-cols-5">

            {/* Search */}
            <input
              type="text"
              placeholder="Search insight..."
              value={filters.title}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  title: e.target.value,
                })
              }
              className="rounded-lg border border-[#36473F]/20 bg-[#F0EEE5]/40 px-4 py-3 text-sm outline-none transition focus:border-[#C6603F]"
            />

            {/* Year */}
            <div className="relative">
              <select
                value={filters.year}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    year: e.target.value,
                    month: "", // year change hone par month reset
                  })
                }
                className="w-full appearance-none rounded-lg border border-[#36473F]/20 bg-[#F0EEE5]/40 px-4 py-3 text-sm outline-none focus:border-[#C6603F]"
              >
                <option value="">All Years</option>

                {years.map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#C6603F]"
              />
            </div>

            {/* Month */}
            <div className="relative">
              <select
                value={filters.month}
                disabled={!filters.year}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    month: e.target.value,
                  })
                }
                className="w-full appearance-none rounded-lg border border-[#36473F]/20 bg-[#F0EEE5]/40 px-4 py-3 text-sm outline-none focus:border-[#C6603F] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">All Months</option>

                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#C6603F]"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    category: e.target.value,
                  })
                }
                className="w-full appearance-none uppercase rounded-lg border border-[#36473F]/20 bg-[#F0EEE5]/40 px-4 py-3 text-sm outline-none focus:border-[#C6603F]"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All Categories" : item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#C6603F]"
              />
            </div>

            {/* Location */}
            <div className="relative">
              <select
                value={filters.location}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    location: e.target.value,
                  })
                }
                className="w-full appearance-none rounded-lg uppercase border border-[#36473F]/20 bg-[#F0EEE5]/40 px-4 py-3 text-sm outline-none focus:border-[#C6603F]"
              >
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All Locations" : item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#C6603F]"
              />
            </div>

          </div>


          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#36473F]/50">
            Showing {filteredBlogs.length} of {blogs.length} insights
          </p>

        </div>
        {blogs.length === 0 ? (
          <div className="rounded border border-dashed border-[#36473F]/20 bg-white/50 p-10 text-center">
            <h2 className="text-xl font-bold text-[#36473F]">
              No Insights added yet
            </h2>
            <p className="mt-2 text-sm text-[#36473F]/60">
              Click Add Insight to create your first Insight.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded border border-[#36473F]/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-225 text-left">
                <thead className="bg-[#202A44]">
                  <tr>
                    <th className="px-5 py-4 text-left font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                      Title
                    </th>
                    <th className="px-5 py-4 text-left font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                      Date
                    </th>
                    <th className="px-5 py-4 text-left font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                      Location
                    </th>
                    <th className="px-5 py-4 text-left font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                      Category
                    </th>
                    <th className="px-5 py-4 text-left font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBlogs.map((blog, index) => {
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
                            <span className="rounded-full bg-[#C6603F]/10 px-3 py-1 text-xs font-bold uppercase   inline text-[#B54323]">
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
                  {editingId ? "Update Insight" : "New Insight"}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#36473F]">
                  {editingId ? "Edit Insight" : "Add Insight"}
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
                placeholder="Insight title"
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
                    ? "Update Insight"
                    : "Save Insight"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}