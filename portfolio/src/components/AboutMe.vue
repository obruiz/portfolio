<template>
  <div class="markdown-viewer">
    <div class="markdown-content">
      <div class="markdown-header">
        <span class="file-type"># Markdown</span>
        <span class="word-count">~350 words</span>
      </div>
      
      <div class="markdown-body">
        <h1>👨‍💻 About Me</h1>
        
        <blockquote>
          <p>Ingeniero Informático con pasión por el desarrollo de software y la creación 
          de soluciones tecnológicas innovadoras. Especializado en desarrollo fullstack 
          y creación de aplicaciones que impacten positivamente a los usuarios.</p>
        </blockquote>

        <h2>💼 Experience</h2>

        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3>CEO & Backend Developer</h3>
              <p class="company">
                <a href="https://noestoy.app" target="_blank" rel="noopener noreferrer">
                  <code>NoEstoy</code>
                </a>
              </p>
              <p class="description">
                Liderando el desarrollo backend y dirección estratégica de la plataforma.
                Enfocado en arquitectura escalable y experiencia de usuario.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3>Fullstack Developer</h3>
              <p class="company"><code>Gestión Tributaria Territorial</code></p>
              <p class="duration">2 años</p>
              <p class="description">
                Desarrollo de soluciones con XML, JavaScript, C# y PL/SQL.
                Implementación de sistemas de gestión tributaria.
              </p>
            </div>
          </div>
        </div>

        <h2>🚀 Featured Project</h2>

        <div class="featured-project">
          <div class="project-card">
            <div class="project-header">
              <h3>
                <a href="https://noestoy.app" target="_blank" rel="noopener noreferrer">
                  noestoy.app
                </a>
              </h3>
              <span class="project-badge">Production</span>
            </div>
            <p class="project-description">
              Aplicación innovadora que mejora la vida cotidiana de las personas.
              Plataforma fullstack con arquitectura moderna y escalable.
            </p>
            <div class="project-tags">
              <span class="tag">Vue.js</span>
              <span class="tag">Node.js</span>
              <span class="tag">PostgreSQL</span>
              <span class="tag">Docker</span>
            </div>
          </div>
        </div>

        <h2>🛠️ Tech Stack</h2>

        <div class="tech-grid">
          <div class="tech-category">
            <h4>Frontend</h4>
            <ul>
              <li><code>Vue.js</code> / <code>React</code></li>
              <li><code>TypeScript</code></li>
              <li><code>CSS3</code> / <code>Tailwind</code></li>
            </ul>
          </div>

          <div class="tech-category">
            <h4>Backend</h4>
            <ul>
              <li><code>Node.js</code></li>
              <li><code>C#</code> / <code>.NET</code></li>
              <li><code>Python</code></li>
            </ul>
          </div>

          <div class="tech-category">
            <h4>Database</h4>
            <ul>
              <li><code>PostgreSQL</code></li>
              <li><code>MySQL</code></li>
              <li><code>MongoDB</code></li>
            </ul>
          </div>

          <div class="tech-category">
            <h4>Tools & Others</h4>
            <ul>
              <li><code>Git</code> / <code>GitHub</code></li>
              <li><code>Docker</code></li>
              <li><code>VS Code</code></li>
            </ul>
          </div>
        </div>

        <hr>

        <p class="footer-note">
          <em>Constantly learning and exploring new technologies to build better solutions.</em>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Componente de información personal
</script>

<style scoped>
.markdown-viewer {
  height: 100%;
  background: var(--vscode-editor-bg);
  overflow-y: auto;
  padding: 20px;
}

.markdown-content {
  max-width: 900px;
  margin: 0 auto;
}

.markdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 6px 6px 0 0;
  font-size: 12px;
  color: var(--vscode-text-secondary);
}

.file-type {
  font-weight: 600;
}

.word-count {
  font-family: 'Consolas', 'Courier New', monospace;
}

.markdown-body {
  padding: 30px;
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  border-top: none;
  border-radius: 0 0 6px 6px;
  color: var(--vscode-text);
  line-height: 1.6;
}

.markdown-body h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--vscode-text);
  border-bottom: 1px solid var(--vscode-border);
  padding-bottom: 10px;
}

.markdown-body h2 {
  font-size: 24px;
  font-weight: 600;
  margin: 30px 0 16px;
  color: var(--vscode-text);
}

.markdown-body h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 16px 0 8px;
  color: var(--vscode-text);
}

.markdown-body h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 12px 0 8px;
  color: var(--vscode-accent);
}

.markdown-body p {
  margin: 12px 0;
  color: var(--vscode-text);
}

.markdown-body blockquote {
  margin: 20px 0;
  padding: 12px 20px;
  background: var(--vscode-sidebar-bg);
  border-left: 4px solid var(--vscode-accent);
  color: var(--vscode-text-secondary);
  font-style: italic;
}

.markdown-body blockquote p {
  margin: 0;
  color: inherit;
}

.markdown-body code {
  padding: 2px 6px;
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 3px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 13px;
  color: #ce9178;
}

.markdown-body a {
  color: var(--vscode-accent);
  text-decoration: none;
  transition: opacity 0.2s;
}

.markdown-body a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.markdown-body hr {
  margin: 30px 0;
  border: none;
  border-top: 1px solid var(--vscode-border);
}

.markdown-body ul {
  margin: 12px 0;
  padding-left: 24px;
}

.markdown-body li {
  margin: 6px 0;
  color: var(--vscode-text);
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 20px 0;
}

.timeline-item {
  display: flex;
  gap: 16px;
  position: relative;
}

.timeline-marker {
  width: 12px;
  height: 12px;
  background: var(--vscode-accent);
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
  position: relative;
}

.timeline-marker::after {
  content: '';
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 40px;
  background: var(--vscode-border);
}

.timeline-item:last-child .timeline-marker::after {
  display: none;
}

.timeline-content {
  flex: 1;
  padding-bottom: 8px;
}

.timeline-content h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
}

.company {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: var(--vscode-text-secondary);
}

.duration {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: var(--vscode-text-secondary);
  font-family: 'Consolas', 'Courier New', monospace;
}

.description {
  margin: 0;
  font-size: 14px;
  color: var(--vscode-text-secondary);
  line-height: 1.6;
}

/* Featured Project */
.featured-project {
  margin: 20px 0;
}

.project-card {
  padding: 20px;
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 6px;
  transition: border-color 0.2s;
}

.project-card:hover {
  border-color: var(--vscode-accent);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.project-header h3 {
  margin: 0;
  font-size: 18px;
}

.project-badge {
  padding: 4px 12px;
  background: rgba(129, 184, 139, 0.2);
  color: var(--vscode-git-added);
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.project-description {
  margin: 12px 0;
  color: var(--vscode-text-secondary);
  font-size: 14px;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.tag {
  padding: 4px 10px;
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 3px;
  font-size: 12px;
  font-family: 'Consolas', 'Courier New', monospace;
  color: #9cdcfe;
}

/* Tech Grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.tech-category {
  padding: 16px;
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 6px;
}

.tech-category h4 {
  margin: 0 0 12px 0;
}

.tech-category ul {
  margin: 0;
  padding-left: 20px;
}

.tech-category li {
  margin: 6px 0;
  font-size: 14px;
}

/* Footer Note */
.footer-note {
  text-align: center;
  color: var(--vscode-text-secondary);
  font-size: 14px;
  margin: 30px 0 0 0;
}

@media (max-width: 768px) {
  .markdown-viewer {
    padding: 10px;
  }

  .markdown-body {
    padding: 20px;
  }

  .markdown-body h1 {
    font-size: 26px;
  }

  .markdown-body h2 {
    font-size: 20px;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }

  .project-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style> 