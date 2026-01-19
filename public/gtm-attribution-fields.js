/**
 * GTM Custom HTML Tag for Pardot Form Handler Attribution Fields
 * 
 * This script populates hidden form fields with attribution data
 * captured from URL parameters and GTM variables.
 * 
 * Installation:
 * 1. Go to GTM > Custom HTML tag
 * 2. Copy this script
 * 3. Set trigger: DOM Ready
 * 4. Set condition: Page URL contains ai.vocalcom.com
 * 
 * Mapped fields:
 * - GCLID → Google_Click_ID__c (Salesforce)
 * - UTM_Source → UTM_Source__c
 * - UTM_Medium → UTM_Medium__c
 * - UTM_Campaign → UTM_Campaign__c
 * - UTM_Content → UTM_Content__c
 * - UTM_Term → UTM_Term__c
 * - Landing_Language → Landing_Language__c
 * - Content_Group → Content_Group__c
 */

(function () {
  'use strict';
  
  /**
   * Set hidden form field value if element exists
   */
  function setField(name, value) {
    var el = document.querySelector('input[name="' + name + '"]');
    if (el && !el.value) {
      el.value = value || '';
      console.log('✅ Set field "' + name + '" = "' + (value ? value.substring(0, 20) + '...' : '') + '"');
    }
  }
  
  /**
   * Get value from URL parameter
   */
  function getUrlParam(name) {
    var regex = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
    var results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1]);
  }
  
  /**
   * Get value from dataLayer (GTM variables)
   * Note: Use exact variable names as defined in GTM
   */
  function getDataLayerValue(key) {
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      for (var i = window.dataLayer.length - 1; i >= 0; i--) {
        if (window.dataLayer[i][key]) {
          return window.dataLayer[i][key];
        }
      }
    }
    return '';
  }
  
  // Wait for form to be ready
  function populateFields() {
    // Get GCLID (highest priority: URL param → dataLayer → _gclid)
    var gclid = getUrlParam('gclid') || 
                getDataLayerValue('gclid') || 
                (window._gclid || '');
    
    // Get UTM parameters (URL params are primary source)
    var utm_source = getUrlParam('utm_source') || getDataLayerValue('utm_source') || '';
    var utm_medium = getUrlParam('utm_medium') || getDataLayerValue('utm_medium') || '';
    var utm_campaign = getUrlParam('utm_campaign') || getDataLayerValue('utm_campaign') || '';
    var utm_content = getUrlParam('utm_content') || getDataLayerValue('utm_content') || '';
    var utm_term = getUrlParam('utm_term') || getDataLayerValue('utm_term') || '';
    
    // Get language (from window.pageLanguage or default)
    var landing_language = getDataLayerValue('landing_language') || 
                           (window.pageLanguage || 'fr');
    
    // Populate all fields
    setField('GCLID', gclid);
    setField('UTM_Source', utm_source);
    setField('UTM_Medium', utm_medium);
    setField('UTM_Campaign', utm_campaign);
    setField('UTM_Content', utm_content);
    setField('UTM_Term', utm_term);
    setField('Landing_Language', landing_language);
    setField('Content_Group', 'landing');
    
    console.log('🎯 Attribution fields populated:', {
      gclid: gclid ? gclid.substring(0, 10) + '...' : '(empty)',
      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_campaign: utm_campaign,
      utm_content: utm_content,
      utm_term: utm_term,
      landing_language: landing_language
    });
  }
  
  // Try to populate immediately
  populateFields();
  
  // Also try again after a short delay in case form loads async
  setTimeout(populateFields, 500);
  setTimeout(populateFields, 1500);
})();
