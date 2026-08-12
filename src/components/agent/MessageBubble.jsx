import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const STATUS_LABEL = {
  pending: 'Pending',
  running: 'Running',
  in_progress: 'Working',
  completed: 'Done',
  success: 'Success',
  failed: 'Failed',
  error: 'Error',
};

function FunctionDisplay({ toolCall }) {
  const [expanded, setExpanded] = useState(false);
  const status = toolCall.status || 'pending';
  const isFailed = ['failed', 'error'].includes(status);
  const label = STATUS_LABEL[status] || status;
  const proj = toolCall.display_projection || {};
  const hideDetails = proj.hide_details && proj.details_redacted;

  let parsedArgs = toolCall.arguments_string;
  try { parsedArgs = JSON.parse(toolCall.arguments_string); } catch { /* keep raw */ }

  let parsedResults = toolCall.results;
  if (typeof parsedResults === 'string') {
    try { parsedResults = JSON.parse(parsedResults); } catch { /* keep raw */ }
  }
  const resultsFailed = typeof parsedResults === 'object' && parsedResults && parsedResults.success === false;

  return (
    <div style={{ marginTop: '10px', fontSize: '12px' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: hideDetails ? 'rgba(242,242,242,0.5)' : (isFailed || resultsFailed ? '#f87171' : '#C8681E'), padding: 0 }}
      >
        <span style={{ width: '14px', textAlign: 'center' }}>{isFailed ? '⚠' : expanded ? '▾' : '▸'}</span>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600 }}>{proj.label || toolCall.name || 'Tool'} — {hideDetails ? (isFailed ? (proj.error_label || 'Failed') : (proj.active_label || label)) : label}</span>
      </button>
      {!hideDetails && expanded && (
        <div style={{ marginTop: '8px', paddingLeft: '22px', color: 'rgba(242,242,242,0.55)' }}>
          {toolCall.arguments_string && (
            <div style={{ marginBottom: '8px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.35)', marginBottom: '4px' }}>Parameters</p>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '11px', margin: 0 }}>{JSON.stringify(parsedArgs, null, 2)}</pre>
            </div>
          )}
          {toolCall.results !== undefined && (
            <div>
              <p style={{ fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.35)', marginBottom: '4px' }}>Result</p>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '11px', margin: 0, color: resultsFailed ? '#f87171' : 'inherit' }}>{JSON.stringify(parsedResults, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: '20px' }}>
      <div style={{ maxWidth: '82%' }}>
        {message.content && (
          isUser ? (
            <div style={{ background: '#C8681E', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '12px 18px', fontSize: '14px', lineHeight: 1.6 }}>
              {message.content}
            </div>
          ) : (
            <div style={{ background: '#1A1A1E', border: '1px solid rgba(242,242,242,0.06)', borderRadius: '16px 16px 16px 4px', padding: '14px 18px', fontSize: '14px', lineHeight: 1.7, color: 'rgba(242,242,242,0.85)' }}>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )
        )}
        {message.tool_calls?.map((tc, idx) => <FunctionDisplay key={idx} toolCall={tc} />)}
      </div>
    </div>
  );
}