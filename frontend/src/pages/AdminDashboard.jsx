import React, { useEffect, useState } from 'react';
import Modal from '@/components/ui/modal';
import ServicePackageForm from '@/components/ServicePackageForm';

export default function AdminDashboard() {
  const [packagesList, setPackagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/packages');
      const data = await res.json();
      setPackagesList(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-24 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">Manage service packages</p>
          </div>
          <button className="bg-primary hover:bg-primary-dark text-primary-foreground px-6 py-3 rounded-md text-lg font-semibold" onClick={() => setOpen(true)}>
            + Add New Package
          </button>
        </div>

        <div className="bg-secondary-light rounded-xl border border-border">
          {loading ? (
            <div className="p-8 text-muted-foreground">Loading...</div>
          ) : (
            <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packagesList.map((p) => (
                <div key={p._id} className="p-5 rounded-lg border border-border bg-card">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="text-xl font-semibold text-foreground">{p.pkgName}</div>
                      <div className="text-sm text-muted-foreground">{p.category} • {p.duration}</div>
                    </div>
                    <div className="text-2xl font-bold text-primary">₹{p.price}</div>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Service Package" actions={null}>
        <ServicePackageForm onSubmit={() => { setOpen(false); fetchPackages(); }} onCancel={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
