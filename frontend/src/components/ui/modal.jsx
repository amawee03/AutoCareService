import React from 'react';

export default function Modal({ open, onClose, title, children, actions }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-background text-foreground w-full max-w-2xl mx-4 rounded-xl shadow-lg-custom border border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-destructive text-2xl leading-none">×</button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {actions && (
          <div className="p-4 border-t border-border flex justify-end gap-3 bg-accent/30 rounded-b-xl">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
