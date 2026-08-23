import { useMemo, useState } from 'react';

const pipelineItems = [
  { key: 'research', label: 'RESEARCH', value: 'Not researched yet', detail: "Scout's advice", tone: 'yellow' },
  { key: 'hook', label: 'HOOK', value: 'Pending', detail: 'Waiting on hook creation', tone: 'orange' },
  { key: 'script', label: 'SCRIPT', value: 'Pending', detail: 'No script output yet', tone: 'orange' },
  { key: 'package', label: 'PACKAGE', value: 'Not made yet', detail: 'No content package available', tone: 'cyan' },
  { key: 'handoff', label: 'HANDOFF', value: 'No handoff yet', detail: 'No production handoff yet', tone: 'yellow' },
  { key: 'team', label: 'TEAM POSTURE', value: '4 out of 4 roles filled', detail: 'Current workspace roles', tone: 'green' },
];

const team = [
  { name: 'Scout', description: 'Spotting opportunities', badge: 'RESEARCH ADVISORY', tone: 'yellow' },
  { name: 'Strategist', description: 'Narrative direction', tone: 'green' },
  { name: 'Creator', description: 'Content production', tone: 'green' },
  { name: 'Critic', description: 'Review and approval', tone: 'green' },
];

const toneClass = (tone) => `tone-${tone}`;

function MiniStatus({ label, value, detail, tone }) {
  return (
    <article className="mini-status">
      <span className={`mini-status__bar ${toneClass(tone)}`} />
      <div className="mini-status__content">
        <span className="eyebrow">{label}</span>
        <strong>{value}</strong>
        <span className="muted truncate">{detail}</span>
      </div>
    </article>
  );
}

function PipelineCard({ label, value, detail, tone }) {
  return (
    <article className="pipeline-card">
      <div className="pipeline-card__topline">
        <span className={`pipeline-card__label ${toneClass(tone)}`}>{label}</span>
        <span className={`status-dot ${toneClass(tone)}`} />
      </div>
      <strong>{value}</strong>
      <span className="muted">{detail}</span>
    </article>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function SelectField({ value, options, onChange }) {
  return (
    <div className="select-wrap">
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      <span className="select-chevron" aria-hidden="true" />
    </div>
  );
}

function TeamMember({ name, description, badge, tone }) {
  return (
    <div className="team-member">
      <div className="team-member__copy">
        <strong>{name}</strong>
        <span>{description}</span>
      </div>
      <div className="team-member__status">
        {badge && <span className={`team-badge ${toneClass(tone)}`}>{badge}</span>}
        <span className={`status-dot ${toneClass(tone || 'green')}`} />
      </div>
    </div>
  );
}

function ContextCell({ label, value }) {
  return (
    <div className="context-cell">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function App() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('Video');
  const [contentType, setContentType] = useState('Script');
  const [audience, setAudience] = useState('');

  const mission = useMemo(() => topic.trim() || 'Initialize Organization', [topic]);

  return (
    <main className="creator-command-center" data-node-id="3:40">
      <section className="top-section" data-node-id="3:41">
        <div className="hero-copy">
          <div className="hero-title-block">
            <span className="eyebrow hero-eyebrow">CREATOR COMMAND</span>
            <h1>Creator command center</h1>
          </div>
          <p className="hero-description">
            Kick off a new creative mission, sort out the team setup, and keep track of what's ready in the workspace.
          </p>
          <div className="tag-row">
            <span className="tag">CREATOR</span>
            <span className="tag">SPHERE: CREATOR</span>
            <span className="tag">MISSION: SET UP ORGANIZATION</span>
          </div>
        </div>

        <div className="mini-status-grid">
          <MiniStatus {...pipelineItems[0]} />
          <MiniStatus {...pipelineItems[1]} />
          <MiniStatus {...pipelineItems[2]} />
          <MiniStatus {...pipelineItems[3]} />
        </div>
      </section>

      <section className="setup-row" data-node-id="3:81">
        <article className="panel mission-setup" data-node-id="3:82">
          <header className="panel-heading">
            <span className="eyebrow">MISSION SETUP</span>
            <h2>Start the creative mission</h2>
            <p>Set up the brief using the current Creator Sphere inputs.</p>
          </header>

          <div className="mission-fields">
            <div className="field-row">
              <Field label="Content idea / topic">
                <input
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  placeholder="Initial topic or concept..."
                />
              </Field>
              <Field label="Platform">
                <SelectField value={platform} onChange={setPlatform} options={['Video', 'Shorts', 'Live']} />
              </Field>
            </div>
            <div className="field-row">
              <Field label="Content type">
                <SelectField value={contentType} onChange={setContentType} options={['Script', 'Video', 'Campaign']} />
              </Field>
              <Field label="Audience">
                <input
                  value={audience}
                  onChange={(event) => setAudience(event.target.value)}
                  placeholder="Audience segment, if you know it"
                />
              </Field>
            </div>
          </div>
        </article>

        <article className="panel team-posture" data-node-id="3:108">
          <header className="panel-heading compact">
            <span className="eyebrow">TEAM POSTURE</span>
            <h2>Creator team</h2>
          </header>
          <div className="team-list">
            {team.map((member) => <TeamMember key={member.name} {...member} />)}
          </div>
        </article>
      </section>

      <section className="pipeline-grid" data-node-id="3:139">
        <div className="pipeline-row">
          {pipelineItems.slice(0, 3).map((item) => <PipelineCard key={item.key} {...item} />)}
        </div>
        <div className="pipeline-row">
          {pipelineItems.slice(3).map((item) => <PipelineCard key={item.key} {...item} />)}
        </div>
      </section>

      <section className="bottom-row" data-node-id="3:178">
        <article className="panel activity-panel" data-node-id="12:4">
          <header className="panel-heading">
            <span className="eyebrow">ACTIVITY</span>
            <h2>Recent creative activity</h2>
          </header>
          <p className="panel-note">Only current live workspace state is reflected here.</p>
          <div className="empty-state">No creative activity yet.</div>
        </article>

        <article className="panel runtime-panel" data-node-id="3:185">
          <header className="panel-heading">
            <span className="eyebrow">RUNTIME CONTEXT</span>
            <h2>Creator workspace status</h2>
          </header>
          <div className="context-grid">
            <ContextCell label="ORGANIZATION" value="OAE" />
            <ContextCell label="ROLE" value="CREATOR" />
            <ContextCell label="ACTIVE SPHERE" value="creator" />
            <ContextCell label="CURRENT MISSION" value={mission} />
          </div>
          <div className="capability-scope">
            <span className="eyebrow">CAPABILITY SCOPE</span>
            <strong>creator, content, script, package, hooks, research</strong>
          </div>
        </article>
      </section>
    </main>
  );
}
