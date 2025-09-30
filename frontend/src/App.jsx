import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Import the new CSS file

// --- SVG ICONS ---
const BotIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const ThumbsUpIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a2 2 0 0 1 1.79 1.11L15 5.88Z" />
    </svg>
);

const ThumbsDownIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a2 2 0 0 1-1.79-1.11L9 18.12Z" />
    </svg>
);

const DownloadIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
    </svg>
);

const UploadCloudIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m16 16-4-4-4 4" />
    </svg>
);

const FileTextIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
);

const ScaleIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 3-8 3 8c-2 1-4 1-6 0" /><path d="m2 16 3-8 3 8c-2 1-4 1-6 0" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2" /><path d="M19 7h2" />
    </svg>
);

const BrainCircuitIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A3 3 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A3 3 0 1 1 12 18Z" /><path d="M15 13a3 3 0 1 0-6 0" /><path d="M12 21v-3" /><path d="M12 8V5" /><path d="m4.5 10.5-.88-2.2" /><path d="m19.5 10.5.88-2.2" /><path d="m7.5 17.5.88 2.2" /><path d="m16.5 17.5-.88 2.2" />
    </svg>
);

const WaypointsIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 2a10 10 0 0 0-10 10c0 4.4 2.8 8.1 6.8 9.5" /><path d="M12 22a10 10 0 0 1 10-10c0-4.4-2.8-8.1-6.8-9.5" />
    </svg>
);

const SwordsIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m14.5 2-2.5 2.5 5 5L19.5 7" /><path d="m9.5 7-5 5 2.5 2.5 5-5" /><path d="M2.5 21.5 7 17" /><path d="m17 7-5 5" />
    </svg>
);

// --- CONFIG ---
const API_BASE_URL = 'http://localhost:3001/api'; // Replace with your deployed backend URL when live

// --- HOME / CHATBOT PAGE ---
const ChatbotPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: 'Hello! I am Judicio, your AI Law Advisor. How can I assist you with your legal questions today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const newMessages = [...messages, { id: Date.now(), sender: 'user', text: input }];
        setMessages(newMessages);
        const currentInput = input;
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: currentInput })
            });
            const data = await response.json();

            const finalAiMessage = {
                id: Date.now() + 1,
                sender: 'ai',
                text: data.text,
                feedback: null
            };
            setMessages(prev => [...prev, finalAiMessage]);
        } catch (error) {
            console.error("Error fetching chat response:", error);
            const errorAiMessage = {
                id: Date.now() + 1,
                sender: 'ai',
                text: 'Sorry, I am having trouble connecting to my knowledge base. Please try again later.',
                feedback: null
            };
            setMessages(prev => [...prev, errorAiMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleFeedback = (id, feedback) => {
        setMessages(msgs => msgs.map(msg => msg.id === id ? { ...msg, feedback } : msg));
    };

    return (
        <div className="page-container chatbot-page">
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-wrapper ${msg.sender === 'user' ? 'user-message-wrapper' : 'ai-message-wrapper'}`}>
                        {msg.sender === 'ai' && <div className="avatar ai-avatar"><BotIcon className="icon" /></div>}
                        <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
                            <div className="prose" dangerouslySetInnerHTML={{ __html: msg.text }} />
                            {msg.sender === 'ai' && msg.id > 1 && (
                                <div className="feedback-container">
                                    <button onClick={() => handleFeedback(msg.id, 'up')} className={`feedback-button ${msg.feedback === 'up' ? 'feedback-up' : ''}`}>
                                        <ThumbsUpIcon className="icon-small" />
                                    </button>
                                    <button onClick={() => handleFeedback(msg.id, 'down')} className={`feedback-button ${msg.feedback === 'down' ? 'feedback-down' : ''}`}>
                                        <ThumbsDownIcon className="icon-small" />
                                    </button>
                                </div>
                            )}
                        </div>
                        {msg.sender === 'user' && <div className="avatar user-avatar"><UserIcon className="icon" /></div>}
                    </div>
                ))}
                {isTyping && (
                    <div className="message-wrapper ai-message-wrapper">
                        <div className="avatar ai-avatar"><BotIcon className="icon" /></div>
                        <div className="message-bubble ai-bubble">
                            <div className="typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-area">
                <div className="chat-input-wrapper">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask a legal question..."
                        className="chat-input"
                    />
                    <button onClick={handleSend} className="send-button">
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- DOCUMENT ANALYZER PAGE ---
const DocumentAnalyzerPage = () => {
    const [file, setFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setAnalysisResult(null);
            setError(null);
        }
    };
    
    const handleAnalyze = async () => {
        if (!file) return;
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setError(null);
        
        const formData = new FormData();
        formData.append('document', file);

        try {
            const response = await fetch(`${API_BASE_URL}/analyze-document`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();
            setAnalysisResult(data);
        } catch (err) {
            setError('Failed to analyze document. The file might be corrupted or in an unsupported format. Please try again.');
            console.error(err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const downloadJSON = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analysisResult, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "analysis_result.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="page-container">
            <h2 className="page-title">Document Analyzer</h2>
            <p className="page-subtitle">Upload a legal document to extract key information and generate a summary.</p>

            <div className="content-wrapper">
                <div className="upload-section">
                    <div className="upload-box">
                        <div className="upload-icon-wrapper">
                            <UploadCloudIcon className="icon-large" />
                        </div>
                        <h3 className="upload-text">
                            {file ? `Selected file: ${file.name}` : 'Drag and drop or click to upload'}
                        </h3>
                        <p className="upload-subtext">PDF, DOCX, TXT up to 10MB</p>
                        <input type="file" onChange={handleFileChange} className="upload-input" accept=".pdf,.docx,.txt" />
                    </div>
                    
                    <button 
                        onClick={handleAnalyze} 
                        disabled={!file || isAnalyzing}
                        className="button primary-button analyze-button"
                    >
                        {isAnalyzing ? (
                            <>
                                <svg className="spinner" viewBox="0 0 50 50">
                                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                                </svg>
                                Analyzing Document...
                            </>
                        ) : 'Analyze Document'}
                    </button>
                </div>
                
                {error && <div className="error-message">{error}</div>}

                {analysisResult && (
                    <div className="results-container">
                        <div className="results-header">
                            <h3 className="results-title">Analysis Results</h3>
                            <button onClick={downloadJSON} className="button secondary-button">
                                <DownloadIcon className="icon-small"/>
                                Export as JSON
                            </button>
                        </div>

                        <div className="results-grid">
                            <div className="results-card">
                                <h4 className="card-title">Key Metrics</h4>
                                <ul className="metrics-list">
                                    {Object.entries(analysisResult.metrics).map(([key, value]) => (
                                        <li key={key}>
                                            <span className="metric-key">{key}:</span>
                                            <span className="metric-value">{String(value)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="results-card">
                                <h4 className="card-title">Generated Summary</h4>
                                <ul className="summary-list">
                                    {analysisResult.summary.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        </div>

                        <div className="highlights-section">
                            <h4 className="card-title">Clause & Argument Highlights</h4>
                            <div className="highlights-wrapper">
                                {analysisResult.highlights.map((item, index) => (
                                    <div key={index} className="highlight-item">
                                        <span className={`highlight-type highlight-type-${item.type?.toLowerCase()}`}>
                                            {item.type}
                                        </span>
                                        <p className="highlight-text">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- CASE OUTCOME PREDICTOR ---
const CaseOutcomePredictorPage = () => {
    const [isPredicting, setIsPredicting] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const formRef = useRef();
    
    const handlePredict = async (e) => {
        e.preventDefault();
        setIsPredicting(true);
        setPrediction(null);

        const formData = new FormData(formRef.current);
        const caseDetails = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_BASE_URL}/predict-outcome`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(caseDetails)
            });
            const data = await response.json();
            setPrediction(data);
        } catch (error) {
            console.error("Prediction failed:", error);
        } finally {
            setIsPredicting(false);
        }
    };
    
    return (
       <div className="page-container">
            <h2 className="page-title">Case Outcome Predictor</h2>
            <p className="page-subtitle">Provide case details to predict the likely outcome.</p>

            <div className="predictor-grid">
                <form ref={formRef} onSubmit={handlePredict} className="form-card">
                     <h3 className="card-title">Case Input Form</h3>
                     <div className="form-group">
                         <label>Case Type</label>
                         <input name="caseType" type="text" defaultValue="Breach of Contract" />
                     </div>
                     <div className="form-group">
                         <label>Jurisdiction</label>
                         <input name="jurisdiction" type="text" defaultValue="Mumbai, Maharashtra" />
                     </div>
                     <div className="form-group">
                         <label>Summary of Facts</label>
                         <textarea name="summary" rows="5" defaultValue="Plaintiff claims defendant failed to deliver goods by the agreed-upon date. Defendant argues unforeseen supply chain issues."></textarea>
                     </div>
                      <button 
                        type="submit"
                        disabled={isPredicting}
                        className="button primary-button"
                    >
                        {isPredicting ? 'Calculating...' : 'Predict Outcome'}
                    </button>
                </form>

                <div className="results-card predictor-results">
                    <h3 className="card-title">Prediction & Analysis</h3>
                    {!prediction && !isPredicting && <div className="placeholder-text">Results will be displayed here.</div>}
                    {isPredicting && <div className="placeholder-text">Generating prediction...</div>}
                    {prediction && (
                        <div className="prediction-content">
                            <div className="prediction-header">
                                <p className="prediction-label">Predicted Outcome</p>
                                <p className="prediction-outcome">{prediction.outcome}</p>
                                <p className="prediction-probability">{prediction.probability}% Probability</p>
                                <p className="prediction-confidence">AI Confidence Score: {prediction.confidence}%</p>
                            </div>
                            <div className="prediction-section">
                                <h4 className="section-title">Reasoning</h4>
                                <p className="section-text">{prediction.reasoning}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- CASE FLOW VISUALIZER ---
const CaseFlowVisualizerPage = () => {
    const [activeNode, setActiveNode] = useState('Complaint Filing');
    const nodes = [
        { id: 'Complaint Filing', title: 'Complaint Filing', description: 'The case begins when the plaintiff files a complaint with the appropriate court, outlining the grievances against the defendant.'},
        { id: 'Discovery', title: 'Discovery', description: 'Both parties exchange information, evidence, and documents. This includes depositions, interrogatories, and requests for documents.'},
        { id: 'Pre-Trial Motions', title: 'Pre-Trial Motions', description: 'Parties may file motions to resolve the case before trial, such as a motion to dismiss or a motion for summary judgment.'},
        { id: 'Trial', title: 'Trial', description: 'If the case is not settled or dismissed, it proceeds to trial where evidence is presented and arguments are made before a judge or jury.'},
        { id: 'Verdict & Judgment', title: 'Verdict & Judgment', description: 'The judge or jury delivers a verdict. The court then issues a final judgment, officially ending the case at the trial level.'},
        { id: 'Appeal', title: 'Appeal', description: 'The losing party may appeal the decision to a higher court, arguing that a legal error occurred during the trial.'},
    ];

    const activeNodeData = nodes.find(n => n.id === activeNode);

    return (
        <div className="page-container">
            <h2 className="page-title">Case Flow Visualizer</h2>
            <p className="page-subtitle">An interactive timeline of a typical legal case progression.</p>
            <div className="content-wrapper">
                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    <div className="timeline-nodes">
                        {nodes.map(node => (
                            <div key={node.id} className="timeline-node-wrapper">
                                <button 
                                    onClick={() => setActiveNode(node.id)}
                                    className={`timeline-node ${activeNode === node.id ? 'active' : ''}`}
                                >
                                </button>
                                <p className={`timeline-label ${activeNode === node.id ? 'active' : ''}`}>{node.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="timeline-details-card">
                    <h3 className="card-title">{activeNodeData.title}</h3>
                    <p className="card-text">{activeNodeData.description}</p>
                    <div className="card-action">
                        <button className="button-link">
                            <FileTextIcon className="icon-small" />
                            Link Analyzed Documents
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- OPPOSITION ARGUMENTS GENERATOR ---
const OppositionArgumentsGeneratorPage = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [results, setResults] = useState(null);
    const formRef = useRef();

    const handleGenerate = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        setResults(null);
        
        const formData = new FormData(formRef.current);
        const caseDetails = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_BASE_URL}/generate-arguments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(caseDetails)
            });
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Failed to generate arguments:", error);
        } finally {
            setIsGenerating(false);
        }
    }
    
    return (
        <div className="page-container">
            <h2 className="page-title">Opposition Arguments Generator</h2>
            <p className="page-subtitle">Generate potential counterarguments your opposition might raise.</p>
            
            <div className="content-wrapper">
                <form ref={formRef} onSubmit={handleGenerate} className="form-card argument-form">
                     <h3 className="card-title">Your Case Details</h3>
                     <div className="form-group">
                         <label>Case Type</label>
                         <input name="caseType" type="text" defaultValue="Breach of Contract" />
                     </div>
                     <div className="form-group">
                         <label>Your Core Argument</label>
                         <textarea name="coreArgument" rows="4" defaultValue="The defendant failed to meet the contractually mandated delivery deadline, causing financial harm to our business."></textarea>
                     </div>
                      <button 
                        type="submit"
                        disabled={isGenerating}
                        className="button primary-button"
                    >
                        {isGenerating ? 'Generating...' : 'Generate Counterarguments'}
                    </button>
                </form>

                {results && (
                    <div className="arguments-results-container">
                        <h3 className="results-title">Generated Counterarguments</h3>
                        <div className="arguments-list">
                            {results.map((item, index) => (
                                <div key={index} className="argument-card">
                                    <h4 className="argument-title">{index + 1}. {item.argument}</h4>
                                    <div className="argument-details">
                                        <div>
                                            <p className="argument-subtitle">Strength & Weakness Analysis</p>
                                            <p className="argument-text">{item.analysis}</p>
                                        </div>
                                        <div>
                                            <p className="argument-subtitle">Suggested Response Strategy</p>
                                            <p className="argument-text">{item.response}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('chatbot');

    const navItems = [
        { id: 'chatbot', label: 'Law Advisor Chat', icon: <BotIcon className="icon" /> },
        { id: 'analyzer', label: 'Document Analyzer', icon: <FileTextIcon className="icon" /> },
        { id: 'predictor', label: 'Case Predictor', icon: <ScaleIcon className="icon" /> },
        { id: 'visualizer', label: 'Case Flow Visualizer', icon: <WaypointsIcon className="icon" /> },
        { id: 'arguments', label: 'Arguments Generator', icon: <SwordsIcon className="icon" /> },
    ];
    
    const renderPage = () => {
        switch (currentPage) {
            case 'chatbot': return <ChatbotPage />;
            case 'analyzer': return <DocumentAnalyzerPage />;
            case 'predictor': return <CaseOutcomePredictorPage />;
            case 'visualizer': return <CaseFlowVisualizerPage />;
            case 'arguments': return <OppositionArgumentsGeneratorPage />;
            default: return <ChatbotPage />;
        }
    };

    return (
        <div className="app-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <ScaleIcon className="header-icon" />
                    <h1 className="header-title">Judicio</h1>
                </div>
                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id)}
                            className={`nav-button ${currentPage === item.id ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>
            
            {/* Main Content */}
            <main className="main-content">
                {renderPage()}
            </main>
        </div>
    );
}