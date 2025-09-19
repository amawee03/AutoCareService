// import React, { useState } from 'react';

// const categories = ['Detailing', 'Maintenance', 'Repair', 'Inspection', 'Bodywork'];

// export default function AdminNewService() {
//   const [form, setForm] = useState({
//     pkgName: '',
//     description: '',
//     category: '',
//     price: '',
//     duration: '',
//     image: null,
//     status: 'active',
//   });
//   const [features, setFeatures] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [featureInput, setFeatureInput] = useState('');
//   const [tagInput, setTagInput] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   const addChip = (value, listSetter, valueSetter) => {
//     const v = value.trim();
//     if (!v) return;
//     listSetter((prev) => (prev.includes(v) ? prev : [...prev, v]));
//     valueSetter('');
//   };

//   const removeChip = (value, listSetter) => {
//     listSetter((prev) => prev.filter((x) => x !== value));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       !form.pkgName ||
//       !form.description ||
//       !form.category ||
//       form.price === '' ||
//       !form.duration
//     ) {
//       alert('Please fill all required fields');
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const data = new FormData();
//       data.append('pkgName', form.pkgName);
//       data.append('description', form.description);
//       data.append('category', form.category);
//       data.append('price', Number(form.price));
//       data.append('duration', form.duration);
//       data.append('status', form.status);
//       if (form.image) data.append('image', form.image);
//       data.append('features', JSON.stringify(features));
//       data.append('tags', JSON.stringify(tags));

//       const res = await fetch('/api/packages', {
//         method: 'POST',
//         body: data,
//       });

//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err.message || 'Failed to create package');
//       }

//       setForm({
//         pkgName: '',
//         description: '',
//         category: '',
//         price: '',
//         duration: '',
//         image: null,
//         status: 'active',
//       });
//       setFeatures([]);
//       setTags([]);
//       alert('Service package created');
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-background min-h-screen">
//       <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-24 py-16">
//         <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-2">
//           Add Service Package
//         </h1>
//         <p className="text-lg text-muted-foreground mb-10">
//           Create a new service package for the catalogue.
//         </p>

//         <form onSubmit={onSubmit} className="space-y-8">
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="space-y-3">
//               <label className="text-sm font-medium">Package Name *</label>
//               <input
//                 className="h-12 rounded-md border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
//                 value={form.pkgName}
//                 onChange={(e) => setForm({ ...form, pkgName: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-3">
//               <label className="text-sm font-medium">Category *</label>
//               <select
//                 className="h-12 rounded-md border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
//                 value={form.category}
//                 onChange={(e) => setForm({ ...form, category: e.target.value })}
//                 required
//               >
//                 <option value="" disabled>
//                   Select a category
//                 </option>
//                 {categories.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="space-y-3">
//               <label className="text-sm font-medium">Price (Rs.) *</label>
//               <input
//                 type="number"
//                 className="h-12 rounded-md border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
//                 value={form.price}
//                 onChange={(e) => setForm({ ...form, price: e.target.value })}
//                 required
//                 min="0"
//               />
//             </div>
//             <div className="space-y-3">
//               <label className="text-sm font-medium">
//                 Duration (e.g., 45 minutes / 3-4 hours) *
//               </label>
//               <input
//                 className="h-12 rounded-md border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
//                 value={form.duration}
//                 onChange={(e) => setForm({ ...form, duration: e.target.value })}
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-3">
//             <label className="text-sm font-medium">Description *</label>
//             <textarea
//               rows={4}
//               className="rounded-md border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//               required
//             />
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="space-y-3">
//               <label className="text-sm font-medium">Upload Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="h-12 rounded-md border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     setForm({ ...form, image: file });
//                   }
//                 }}
//               />
//             </div>
//           </div>

//           <div className="space-y-3">
//             <label className="text-sm font-medium">Status</label>
//             <select
//               className="h-12 rounded-md border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
//               value={form.status}
//               onChange={(e) => setForm({ ...form, status: e.target.value })}
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="space-y-3">
//               <label className="text-sm font-medium">Ftures</label>
//               <div className="flex gap-3">
//                 <input
//                   className="h-12 flex-1 rounded-md border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
//                   placeholder="Add feature"
//                   value={featureInput}
//                   onChange={(e) => setFeatureInput(e.target.value)}
//                   onKeyDown={(e) =>
//                     e.key === 'Enter' &&
//                     (e.preventDefault(),
//                     addChip(featureInput, setFeatures, setFeatureInput))
//                   }
//                 />
//                 <button
//                   type="button"
//                   className="px-5 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark"
//                   onClick={() =>
//                     addChip(featureInput, setFeatures, setFeatureInput)
//                   }
//                 >
//                   Add
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {features.map((f) => (
//                   <span
//                     key={f}
//                     className="inline-flex items-center gap-2 bg-primary-muted text-primary px-3 py-1 rounded-full border border-primary/40"
//                   >
//                     {f}
//                     <button
//                       type="button"
//                       className="text-destructive"
//                       onClick={() => removeChip(f, setFeatures)}
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-3">
//               <label className="text-sm font-medium">Tags</label>
//               <div className="flex gap-3">
//                 <input
//                   className="h-12 flex-1 rounded-md border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
//                   placeholder="Add tag"
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   onKeyDown={(e) =>
//                     e.key === 'Enter' &&
//                     (e.preventDefault(),
//                     addChip(tagInput, setTags, setTagInput))
//                   }
//                 />
//                 <button
//                   type="button"
//                   className="px-5 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark"
//                   onClick={() => addChip(tagInput, setTags, setTagInput)}
//                 >
//                   Add
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {tags.map((t) => (
//                   <span
//                     key={t}
//                     className="inline-flex items-center gap-2 bg-accent text-foreground px-3 py-1 rounded-full border border-border"
//                   >
//                     {t}
//                     <button
//                       type="button"
//                       className="text-destructive"
//                       onClick={() => removeChip(t, setTags)}
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="pt-2">
//             <button
//               type="submit"
//               disabled={submitting}
//               className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 rounded-md text-lg font-semibold disabled:opacity-60"
//             >
//               {submitting ? 'Saving...' : 'Create Package'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
