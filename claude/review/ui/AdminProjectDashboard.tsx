import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", description: "" });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase.from("projects").select("*");
    if (!error) setProjects(data);
  }

  async function handleCreate() {
    const { data, error } = await supabase.from("projects").insert([form]);
    if (!error) {
      setForm({ title: "", slug: "", description: "" });
      fetchProjects();
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Project Dashboard</h1>
      <div className="space-y-2">
        <Input
          placeholder="Project Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Button onClick={handleCreate}>Add Project</Button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Current Projects</h2>
        <ul className="space-y-1">
          {projects.map((p) => (
            <li key={p.id} className="border p-2 rounded">
              <strong>{p.title}</strong> — <code>{p.slug}</code>
              <p className="text-sm text-gray-600">{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
