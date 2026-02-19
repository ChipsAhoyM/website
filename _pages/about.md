---
layout: about
title: about
permalink: /

profile:
  align: right
  image: profile/DDK.JPG

publication: true  # includes a list of papers
publication_years: [2025, 2024, 2023, 2022]  # to show the papers in these years
social: true  # includes social icons at the bottom of the page
---

I am a final-year Ph.D. student in the School of Computer Science at Peking University, advised by Prof. Boxin Shi at the <a href="https://camera.pku.edu.cn" target="_blank">Camera Intelligence Lab</a>. My current research interests lie in Computational Photography and Generative AI, with a primary focus on neuromorphic cameras and video generation.

I obtained my B.S. in Computer Science from the School of EECS and my B.H. in History from the Department of History at Peking University in 2021.
<br>
<br>

## Selected Publications
<div class="publications">
<p><sup>*</sup> Equal Contribution</p>
{% for y in page.publication_years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}, selected=true]* %}
{% endfor %}
<div class="center-button">
      <a href="/publications" class="btn btn-transparent">all publications</a>
</div>
</div>

<style>
  .btn-transparent {
    background-color: transparent;
    border: 1.5px solid var(--global-theme-color, #007bff);
    color: var(--global-theme-color, #007bff);
    padding: 8px 20px;
    font-size: 14px;
    border-radius: 25px;
    text-decoration: none;
    transition: all 0.3s ease;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .btn-transparent:hover {
    background-color: var(--global-theme-color, #007bff);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.25);
    text-decoration: none;
  }

  .center-button {
    text-align: center;
    margin-top: 30px;
  }
</style>


<br>

## Experiences
<div class="experience">
  <hr class="divider">
  <ul>
    {% for exp in site.data.experiences %}
    <li>
      <a href="{{ exp.url }}" target="_blank">
        <img src="{{ '/assets/img/logos/' | append: exp.logo | relative_url }}" alt="{{ exp.name }} Logo" class="logo logo-dark">
        {% if exp.logo_light %}
        <img src="{{ '/assets/img/logos/' | append: exp.logo_light | relative_url }}" alt="{{ exp.name }} Logo" class="logo logo-light">
        {% endif %}
        <div class="text">
          <span class="time">{{ exp.role }}</span>
          <span class="time">{{ exp.period }}</span>
        </div>
      </a>
    </li>
    {% endfor %}
  </ul>
</div>

<style>
  .experience ul {
    list-style: none;
    padding-left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-top: 15px;
  }

  .experience li {
    background-color: var(--global-bg-color, #f8f9fa);
    padding: 24px 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid rgba(128, 128, 128, 0.1);
    transition: all 0.3s ease;
  }

  .experience li:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: var(--global-theme-color, #007bff);
  }

  .experience li a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .experience .logo {
    width: auto;
    height: 45px;
    object-fit: contain;
    margin-bottom: 18px;
    transition: transform 0.3s ease;
  }

  /* Light mode: show dark logo, hide light logo */
  .experience .logo-light { display: none; }
  .experience .logo-dark  { display: block; }

  /* Dark mode: show light logo, hide dark logo */
  html[data-theme='dark'] .experience .logo-light { display: block; }
  html[data-theme='dark'] .experience .logo-dark  { display: none; }

  .experience li:hover .logo {
    transform: scale(1.05);
  }

  .experience .text {
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .experience .role {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--global-text-color, #333);
  }

  .experience .time {
    font-size: 13px;
    color: var(--global-text-color-light, #6c757d);
  }

  .experience .divider {
    border: none;
    border-top: 1px solid rgba(128, 128, 128, 0.2);
    margin-bottom: 20px;
  }

  @media (prefers-color-scheme: light) {
    .divider {
      border-color: #ddd;
    }
  }

  @media (prefers-color-scheme: dark) {
    .divider {
      border-color: #333;
    }
    .experience li {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }

  @media screen and (max-width: 480px) {
    .experience ul {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .experience li {
      padding: 18px 15px;
    }
    .experience .logo {
      height: 35px;
      margin-bottom: 12px;
    }
    .experience .role {
      font-size: 14px;
    }
    .experience .time {
      font-size: 12px;
    }
  }
</style>

<br>

## Services
<div class="services">
  <hr class="divider">
  <div class="services-grid">
    {% for card in site.data.services %}
    <div class="service-card">
      <div class="card-header">
        <i class="{{ card.icon }}"></i>
        <h3>{{ card.title }}</h3>
      </div>
      <div class="card-content">
        {% for item in card.items %}
        <div class="service-item">
          <span class="label">{{ item.label }}</span>
          <span class="venues">{{ item.venues }}{% if item.time %}<span class="time">{{ item.time }}</span>{% endif %}</span>
        </div>
        {% endfor %}
      </div>
    </div>
    {% endfor %}
  </div>
</div>

<style>
  .services .divider {
    border: none;
    border-top: 1px solid rgba(128, 128, 128, 0.2);
    margin-bottom: 20px;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .service-card {
    background: var(--global-bg-color, #fff);
    border: 1px solid rgba(128, 128, 128, 0.1);
    border-radius: 12px;
    padding: 20px 24px;
    transition: all 0.3s ease;
  }

  .service-card:hover {
    border-color: var(--global-theme-color, #007bff);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  }

  .card-header i {
    color: var(--global-theme-color, #007bff);
    font-size: 20px;
  }

  .card-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--global-text-color, #333);
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .service-item {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .service-item .label {
    font-size: 12px;
    font-weight: 600;
    color: var(--global-theme-color, #007bff);
    background: rgba(0, 123, 255, 0.08);
    padding: 2px 8px;
    border-radius: 4px;
    flex-shrink: 0;
    width: 90px;
    text-align: center;
  }

  .service-item .venues {
    font-size: 14px;
    color: var(--global-text-color, #555);
    line-height: 1.5;
  }

  .service-item .venues .time {
    display: block;
    font-size: 12px;
    color: var(--global-text-color-light, #888);
    margin-top: 2px;
  }

  @media screen and (max-width: 600px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
    .service-card {
      padding: 16px 18px;
    }
    .service-item {
      flex-direction: column;
      gap: 4px;
    }
    .service-item .label {
      min-width: auto;
    }
  }
</style>
