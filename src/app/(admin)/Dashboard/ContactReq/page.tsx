"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Mail,
  MapPin,
  Search,
  Eye,
  Trash2,
  X,
} from "lucide-react";

type ContactReq = {
  id: number;
  name: string;
  email: string;
  address: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export default function ContactReqPage() {
  const [requests, setRequests] = useState<ContactReq[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] =
    useState<ContactReq | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 10;

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/request", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setRequests(data.requests || []);
      }
    } catch (error) {
      console.error("FETCH REQUESTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };
const exportToExcel = () => {
  if (filteredRequests.length === 0) {
    alert("No requests available to export.");
    return;
  }

  const headers = [
    "ID",
    "Name",
    "Email",
    "Address",
    "Description",
    "Created At",
    "Updated At",
  ];

  const rows = filteredRequests.map((req) => [
    req.id,
    req.name,
    req.email,
    req.address,
    req.description,
    formatDate(req.created_at),
    formatDate(req.updated_at),
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "contact_requests.csv";
  link.click();

  URL.revokeObjectURL(url);
};
  const filteredRequests = requests.filter((req) => {
    const value = `${req.name} ${req.email} ${req.address} ${req.description}`;
    return value.toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredRequests.length / perPage);

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this request?")) return;

    setDeleteLoading(true);

    try {
      const res = await fetch(`/api/request?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        fetchRequests();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setDeleteLoading(false);
    }
  };
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-[#F0EEE5] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 font-pitch text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C6603F]">
              Admin Panel
            </p>
            <h1 className="font-cringe text-[38px] leading-none text-[#202A44] md:text-[52px]">
              Contact Requests
            </h1>
          </div>
<button
  onClick={exportToExcel}
  className="
    rounded-full
    bg-[#202A44]
    px-5
    py-3
    font-pitch
    text-[12px]
    uppercase
    tracking-[0.2em]
    text-white
    transition
    hover:bg-[#C6603F]
  "
>
  Export Excel
</button>
          <div className="relative w-full md:max-w-sm">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#202A44]/50"
            />
            <input
              type="text"
              placeholder="Search request..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-full border border-[#202A44]/15 bg-white px-11 py-3 font-pitch text-[12px] text-[#202A44] outline-none placeholder:text-[#202A44]/40"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-[#202A44]/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-250 border-collapse">
              <thead className="bg-[#202A44]">
                <tr>
                  <th className="px-5 py-4 text-left font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                    ID
                  </th>
                  <th className="px-5 py-4 text-left font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                    Name
                  </th>
                  <th className="px-5 py-4 text-left font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                    Email
                  </th>
                  <th className="px-5 py-4 text-left font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                    Address
                  </th>
                  <th className="px-5 py-4 text-left font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                    Description
                  </th>
                  <th className="px-5 py-4 text-left font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                    Created
                  </th>
                  <th className="px-5 py-4 text-center font-pitch text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0EEE5]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center font-pitch text-sm text-[#202A44]/60"
                    >
                      Loading requests...
                    </td>
                  </tr>
                ) : paginatedRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center font-pitch text-sm text-[#202A44]/60"
                    >
                      No requests found
                    </td>
                  </tr>
                ) : (
                  paginatedRequests.map((req, index) => (
                    <tr
                      key={req.id}
                      className="border-b border-[#202A44]/10 transition hover:bg-[#F0EEE5]/70"
                    >
                      <td className="px-5 py-4 font-pitch text-xs font-semibold text-[#C6603F]">
                        #{req.id}
                      </td>

                      <td className="px-5 py-4 font-pitch text-sm font-semibold text-[#202A44]">
                        {req.name}
                      </td>

                      <td className="px-5 py-4 font-pitch text-sm text-[#202A44]/70">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-[#C6603F]" />
                          {req.email}
                        </div>
                      </td>

                      <td className="px-5 py-4 font-pitch text-sm text-[#202A44]/70">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-[#C6603F]" />
                          {req.address}
                        </div>
                      </td>

                      <td className="max-w-xs px-5 py-4 font-pitch text-sm leading-relaxed text-[#202A44]/70">
                        <p className="line-clamp-2">{req.description}</p>
                      </td>

                      <td className="px-5 py-4 font-pitch text-sm text-[#202A44]/70">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={14} className="text-[#C6603F]" />
                          {formatDate(req.created_at)}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">

                          <button
                            onClick={() => setSelectedRequest(req)}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            disabled={deleteLoading}
                            onClick={() => handleDelete(req.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600 transition hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
          {selectedRequest && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
              <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b px-6 py-5">
                  <div>
                    <h2 className="text-2xl font-bold text-[#202A44]">
                      Contact Request
                    </h2>

                    <p className="mt-1 text-sm text-[#202A44]/60">
                      Full request information
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="rounded-full p-2 transition hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-5 px-6 py-6">

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#C6603F]">
                      Name
                    </p>

                    <p className="mt-1 font-semibold text-[#202A44]">
                      {selectedRequest.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#C6603F]">
                      Email
                    </p>

                    <p className="mt-1">
                      {selectedRequest.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#C6603F]">
                      Address
                    </p>

                    <p className="mt-1">
                      {selectedRequest.address}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#C6603F]">
                      Date
                    </p>

                    <p className="mt-1">
                      {formatDate(selectedRequest.created_at)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#C6603F]">
                      Description
                    </p>

                    <div className="mt-2 rounded-xl bg-[#F0EEE5] p-5 leading-7 text-[#202A44]">
                      {selectedRequest.description}
                    </div>
                  </div>

                </div>

                <div className="flex justify-end border-t px-6 py-5">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="rounded-full bg-[#202A44] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C6603F]"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 border-t border-[#202A44]/10 px-5 py-5 md:flex-row md:items-center md:justify-between">
            <p className="font-pitch text-xs uppercase tracking-[0.18em] text-[#202A44]/60">
              Showing {paginatedRequests.length} of {filteredRequests.length}{" "}
              requests
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="rounded-full border border-[#202A44]/15 px-4 py-2 font-pitch text-[11px] uppercase tracking-[0.18em] text-[#202A44] transition hover:bg-[#202A44] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>

              <span className="px-3 font-pitch text-xs text-[#202A44]/70">
                {currentPage} / {totalPages || 1}
              </span>

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="rounded-full border border-[#202A44]/15 px-4 py-2 font-pitch text-[11px] uppercase tracking-[0.18em] text-[#202A44] transition hover:bg-[#202A44] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 