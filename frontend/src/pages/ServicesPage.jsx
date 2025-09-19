import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ServicesPage() {
  const [packagesList, setPackagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/packages");
        if (!res.ok) throw new Error("Failed to load packages");
        const data = await res.json();
        setPackagesList(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Failed to load packages");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-24 border-b border-border">
        <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-24">
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground tracking-tight">Services</h1>
          <p className="mt-6 text-2xl lg:text-3xl text-muted-foreground max-w-4xl leading-relaxed">
            Explore our professional automotive services tailored to your needs.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-24">
          {loading ? (
            <div className="text-muted-foreground">Loading packages...</div>
          ) : error ? (
            <div className="text-destructive">{error}</div>
          ) : packagesList.length === 0 ? (
            <div className="text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">No service packages yet</h2>
              <p className="text-lg lg:text-xl text-muted-foreground">
                Once packages are added, they will appear here. You can add packages from the admin dashboard.
              </p>
              <div className="pt-4">
                <Link to="/admin" className="inline-block bg-primary text-primary-foreground hover:bg-primary-dark px-8 py-4 rounded-md text-lg font-semibold">
                  Go to Admin Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {packagesList.map((p) => (
                <div key={p._id} className="overflow-hidden border border-border rounded-xl bg-card hover:shadow-lg transition-shadow">
                  {p.image ? (
                    <img src={p.image} alt={p.pkgName} className="w-full h-44 object-cover" />
                  ) : null}
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold text-foreground">{p.pkgName}</h3>
                      <div className="text-2xl font-extrabold text-secondary">₹{p.price}</div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                    <div className="flex items-center justify-between bg-primary-muted/40 border border-primary/30 rounded-lg px-3 py-2">
                      <span className="text-sm font-medium text-foreground">{p.duration}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{p.category}</span>
                    </div>
                    {Array.isArray(p.features) && p.features.length > 0 && (
                      <ul className="text-sm space-y-1">
                        {p.features.slice(0,3).map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary"></span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
