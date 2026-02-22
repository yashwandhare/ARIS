import { useState, useRef } from 'react';
import { ShieldCheck, Loader2, CheckCircle2, ChevronDown, ChevronUp, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocFile {
    name: string;
    type: string;
    size: number;
}

type VerifyStatus = 'idle' | 'verifying' | 'verified' | 'failed';

const DOC_TYPES = [
    { id: 'aadhaar', label: 'Aadhaar Card', accept: 'image/*,.pdf', icon: '🪪' },
    { id: 'pan', label: 'PAN Card', accept: 'image/*,.pdf', icon: '💳' },
    { id: 'degree', label: 'Degree Certificate', accept: 'image/*,.pdf', icon: '🎓' },
    { id: 'marksheet12', label: 'Class XII Marksheet', accept: 'image/*,.pdf', icon: '📋' },
    { id: 'marksheet10', label: 'Class X Marksheet', accept: 'image/*,.pdf', icon: '📋' },
];

export function DigiLockerSection() {
    const [open, setOpen] = useState(false);
    const [aadhaarNum, setAadhaarNum] = useState('');
    const [aadhaarErr, setAadhaarErr] = useState('');
    const [docs, setDocs] = useState<Record<string, DocFile | null>>({});
    const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle');
    const [verifiedDocs, setVerifiedDocs] = useState<string[]>([]);
    const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

    const handleFile = (docId: string, file: File | null) => {
        if (!file) return;
        setDocs(prev => ({ ...prev, [docId]: { name: file.name, type: file.type, size: file.size } }));
    };

    const removeDoc = (docId: string) => {
        setDocs(prev => ({ ...prev, [docId]: null }));
        if (fileRefs.current[docId]) fileRefs.current[docId]!.value = '';
    };

    const validateAadhaar = (val: string) => {
        const cleaned = val.replace(/\D/g, '');
        if (cleaned.length > 0 && cleaned.length !== 12) return 'Aadhaar must be 12 digits';
        return '';
    };

    const hasAnything = aadhaarNum.trim().length === 12 || Object.values(docs).some(Boolean);

    const handleVerify = async () => {
        const err = validateAadhaar(aadhaarNum);
        if (err && aadhaarNum.trim()) { setAadhaarErr(err); return; }
        setVerifyStatus('verifying');
        // Mock 2-second verification
        await new Promise(r => setTimeout(r, 2000));
        // Mark uploaded documents as verified
        const verified: string[] = [];
        if (aadhaarNum.trim().length === 12) verified.push('aadhaar');
        DOC_TYPES.forEach(dt => { if (docs[dt.id]) verified.push(dt.id); });
        setVerifiedDocs(verified);
        setVerifyStatus('verified');
    };

    const reset = () => {
        setVerifyStatus('idle');
        setVerifiedDocs([]);
        setAadhaarNum('');
        setAadhaarErr('');
        setDocs({});
    };

    return (
        <div className="flat-card overflow-hidden">
            {/* Header — click to expand/collapse */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-cream-100 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky/20 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-charcoal-800">DigiLocker Document Verification</h3>
                            <span className="text-xs bg-lime/20 text-green-700 border border-lime/30 px-2 py-0.5 rounded-full font-medium">Optional</span>
                        </div>
                        <p className="text-sm text-charcoal-500 mt-0.5">
                            Upload your Aadhaar, marksheets, or degree certificate to strengthen your application
                        </p>
                    </div>
                    {verifyStatus === 'verified' && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-lime/20 border border-lime/30 px-3 py-1 rounded-full ml-4">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                        </span>
                    )}
                </div>
                {open ? <ChevronUp className="h-4 w-4 text-charcoal-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-charcoal-400 shrink-0" />}
            </button>

            {open && (
                <div className="px-6 pb-6 space-y-5 border-t border-charcoal-100">
                    {verifyStatus === 'verified' ? (
                        /* ── Verified state ── */
                        <div className="pt-5 space-y-4">
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-lime/10 border border-lime/20">
                                <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                                <div>
                                    <p className="font-semibold text-charcoal-800">Documents Verified via DigiLocker</p>
                                    <p className="text-xs text-charcoal-500 mt-0.5">Mock verification · Production requires DigiLocker API credentials</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {verifiedDocs.map(id => {
                                    const dt = DOC_TYPES.find(d => d.id === id);
                                    const label = id === 'aadhaar' ? 'Aadhaar Card' : dt?.label ?? id;
                                    const icon = id === 'aadhaar' ? '🪪' : dt?.icon ?? '📄';
                                    return (
                                        <div key={id} className="flex items-center gap-2 p-3 rounded-lg border border-lime/20 bg-white/60 text-sm">
                                            <span>{icon}</span>
                                            <span className="text-charcoal-700">{label}</span>
                                            <span className="ml-auto text-green-600 font-medium text-xs">✓ Verified</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <button type="button" onClick={reset} className="text-xs text-charcoal-400 hover:text-charcoal-600 underline">
                                Re-upload documents
                            </button>
                        </div>
                    ) : (
                        /* ── Upload state ── */
                        <div className="pt-5 space-y-5">
                            <p className="text-xs text-charcoal-400 italic">
                                🔒 Mock integration — in production this connects to{' '}
                                <span className="font-mono">api.digitallocker.gov.in</span> (API approval takes 15–30 days)
                            </p>

                            {/* Aadhaar number */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-charcoal-700">Aadhaar Number</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={12}
                                    placeholder="12-digit Aadhaar number"
                                    value={aadhaarNum}
                                    onChange={e => {
                                        const v = e.target.value.replace(/\D/g, '');
                                        setAadhaarNum(v);
                                        setAadhaarErr(validateAadhaar(v));
                                    }}
                                    className={`w-full max-w-xs h-10 px-3 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky/40 font-mono tracking-widest ${aadhaarErr ? 'border-red-300' : 'border-charcoal-200'}`}
                                />
                                {aadhaarErr && <p className="text-xs text-red-500">{aadhaarErr}</p>}
                            </div>

                            {/* Document uploads */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-charcoal-700">Supporting Documents</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {DOC_TYPES.map(dt => {
                                        const uploaded = docs[dt.id];
                                        return (
                                            <div key={dt.id} className={`relative p-3 rounded-lg border-2 border-dashed text-sm transition-colors ${uploaded ? 'border-lime/40 bg-lime/5' : 'border-charcoal-200 bg-white/40 hover:border-charcoal-300'}`}>
                                                <input
                                                    type="file"
                                                    accept={dt.accept}
                                                    className="hidden"
                                                    ref={el => { fileRefs.current[dt.id] = el; }}
                                                    onChange={e => handleFile(dt.id, e.target.files?.[0] ?? null)}
                                                />
                                                {uploaded ? (
                                                    <div className="flex items-center gap-2">
                                                        <span>{dt.icon}</span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-charcoal-800 truncate text-xs">{dt.label}</p>
                                                            <p className="text-xs text-charcoal-400 truncate">{uploaded.name}</p>
                                                        </div>
                                                        <button type="button" onClick={() => removeDoc(dt.id)} className="shrink-0 text-charcoal-400 hover:text-red-500 transition-colors">
                                                            <X className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => fileRefs.current[dt.id]?.click()}
                                                        className="w-full flex items-center gap-2 text-charcoal-500 hover:text-charcoal-800 transition-colors"
                                                    >
                                                        <span>{dt.icon}</span>
                                                        <span className="flex-1 text-left">{dt.label}</span>
                                                        <Upload className="h-3.5 w-3.5 shrink-0" />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Verify button */}
                            <Button
                                type="button"
                                onClick={handleVerify}
                                disabled={!hasAnything || verifyStatus === 'verifying' || !!aadhaarErr}
                                className="gap-2 bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-50"
                            >
                                {verifyStatus === 'verifying' ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Verifying via DigiLocker...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="h-4 w-4" />
                                        Verify Documents (Mock)
                                    </>
                                )}
                            </Button>
                            {!hasAnything && (
                                <p className="text-xs text-charcoal-400">Enter your Aadhaar number or upload at least one document to verify.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
