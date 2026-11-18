<script lang="ts">
  import type { Price, Service } from '../../lib/supabase';
  export let services: Service[] = [];
  export let prices: Price[] = [];
  export let pricesLoading = false;
  export let currency = 'USD';
  export let currencyFlag = '';
  export let onCurrencyChange: (event: Event) => void;
</script>

<section id="services" class="default-section default">
  <div class="section-tag default"><span class="section-tag-icon default">📜</span><span class="section-tag-text default">Service menu</span><span class="section-tag-line"></span></div>
  <h2 class="section-text-header">What I can build for you</h2><p class="section-subtitle">End-to-end backend engineering — from architecture to deployment.</p>
  <div class="services-grid"><div class="flag-wrapper"><span class="flag-icon default"><img src={currencyFlag} alt="Currency region" /></span><span class="arrow">▼</span><label class="sr-only" for="currency-select">Currency for service pricing</label><select id="currency-select" bind:value={currency} onchange={onCurrencyChange}><option value="IDR">IDR</option><option value="USD">US</option><option value="RM">RM</option><option value="SGD">SGD</option></select></div></div>
  <div class="services-menu-grid default">
    {#each services as service (service.id)}
      {@const price = prices.find((item) => item.services_id === service.id && item.prefix.toUpperCase() === currency)}
      <article class="service-card default visible group" class:active={service.highlight}><div class="service-header default"><span class="service-num default">{service.num}</span><span class="service-icon default">{service.icon}</span></div><h3 class="service-title default">{service.title}</h3><p class="service-desc default">{service.description}</p><ul class="service-list default">{#each (service.stacks ?? '').split(';').filter((item) => item && item !== 'e') as item}<li>{item}</li>{/each}</ul><div class="service-price default"><span class="price-label default">Starting from</span><strong class="price-value default">{price?.price ?? (pricesLoading ? 'Loading...' : 'Unavailable')} <small>{currency}{price?.state ? ` / ${price.state}` : ''}</small></strong></div></article>
    {/each}
  </div>
</section>
