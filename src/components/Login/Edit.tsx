import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Save, X, PlusCircle } from 'lucide-react';
import Setting from '../../utils/Settings';

type Link = {
    Name: string;
    Icon: string;
    Href: string;
};

type MainProfile = {
    Image: string;
    Greeting: string;
    Name: string;
    Tags: string[];
    Links: Link[];
};

const initialData: MainProfile = Setting.getUserData().Main;

export const EditProfile = () => {
    const [form, setForm] = useState<MainProfile>(initialData);
    const [status, setStatus] = useState<'idle' | 'saving'>('idle');

    const handleChange = (key: keyof MainProfile, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handleTagChange = (index: number, value: string) => {
        const updated = [...form.Tags];
        updated[index] = value;
        setForm({ ...form, Tags: updated });
    };

    const handleLinkChange = (index: number, field: keyof Link, value: string) => {
        const updated = [...form.Links];
        updated[index][field] = value;
        setForm({ ...form, Links: updated });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus('saving');

        // Simulate saving
        setTimeout(() => {
            console.log('Saved profile:', form);
            setStatus('idle');
        }, 1500);
    };

    const addTag = () => setForm({ ...form, Tags: [...form.Tags, ""] });
    const removeTag = (i: number) => setForm({ ...form, Tags: form.Tags.filter((_, index) => index !== i) });

    const addLink = () =>
        setForm({
            ...form,
            Links: [...form.Links, { Name: '', Icon: '', Href: '' }]
        });

    const removeLink = (i: number) =>
        setForm({ ...form, Links: form.Links.filter((_, index) => index !== i) });

    return (
        <section className="py-16 px-6 max-w-4xl mx-auto">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md"
            >
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

                <div>
                    <label className="block font-medium mb-1">Greeting</label>
                    <input
                        type="text"
                        value={form.Greeting}
                        onChange={(e) => handleChange("Greeting", e.target.value)}
                        className="input w-full"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={form.Name}
                        onChange={(e) => handleChange("Name", e.target.value)}
                        className="input w-full"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Profile Image URL</label>
                    <input
                        type="text"
                        value={form.Image}
                        onChange={(e) => handleChange("Image", e.target.value)}
                        className="input w-full"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Tags</label>
                    <div className="space-y-2">
                        {form.Tags.map((tag, idx) => (
                            <div key={idx} className="flex gap-2">
                                <input
                                    type="text"
                                    value={tag}
                                    onChange={(e) => handleTagChange(idx, e.target.value)}
                                    className="input w-full"
                                />
                                <button type="button" onClick={() => removeTag(idx)}>
                                    <X className="text-red-500" />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addTag} className="text-sm text-blue-600 flex items-center gap-1">
                            <PlusCircle className="w-4 h-4" /> Add Tag
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-2">Links</label>
                    <div className="space-y-3">
                        {form.Links.map((link, idx) => (
                            <div key={idx} className="grid grid-cols-3 gap-2 items-center">
                                <input
                                    type="text"
                                    value={link.Name}
                                    placeholder="Name"
                                    onChange={(e) => handleLinkChange(idx, 'Name', e.target.value)}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    value={link.Icon}
                                    placeholder="Icon (e.g., GitHub)"
                                    onChange={(e) => handleLinkChange(idx, 'Icon', e.target.value)}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    value={link.Href}
                                    placeholder="URL"
                                    onChange={(e) => handleLinkChange(idx, 'Href', e.target.value)}
                                    className="input"
                                />
                                <button type="button" onClick={() => removeLink(idx)} className="text-red-500">
                                    <X />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addLink} className="text-sm text-blue-600 flex items-center gap-1">
                            <PlusCircle className="w-4 h-4" /> Add Link
                        </button>
                    </div>
                </div>

                <motion.button
                    type="submit"
                    className="btn btn-primary flex items-center gap-2"
                    disabled={status === 'saving'}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {status === 'saving' ? 'Saving...' : 'Save Changes'} <Save className="w-4 h-4" />
                </motion.button>
            </motion.form>
        </section>
    );
};
