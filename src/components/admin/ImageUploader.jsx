import { useState, useRef } from 'react';

export default function ImageUploader({ value, onChange, label = 'Image' }) {
    const [mode, setMode] = useState('url'); // 'url' or 'file'
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Convert to base64 data URL
        const reader = new FileReader();
        reader.onload = (ev) => {
            onChange(ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="form-group">
            <label>{label}</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <button
                    type="button"
                    className={`btn ${mode === 'url' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ padding: '6px 14px', fontSize: '12px' }}
                    onClick={() => setMode('url')}
                >
                    <i className="fas fa-link"></i> URL
                </button>
                <button
                    type="button"
                    className={`btn ${mode === 'file' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ padding: '6px 14px', fontSize: '12px' }}
                    onClick={() => setMode('file')}
                >
                    <i className="fas fa-upload"></i> Upload File
                </button>
            </div>
            {mode === 'url' ? (
                <input
                    type="url"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="https://..."
                />
            ) : (
                <>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', width: '100%' }}
                    />
                    {value && (
                        <div style={{ marginTop: '8px' }}>
                            <img
                                src={value}
                                alt="Preview"
                                style={{ maxWidth: '100px', maxHeight: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
