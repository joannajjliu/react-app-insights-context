import { SeverityLevel } from '@microsoft/applicationinsights-web';

export function trackException(appInsights) {
  appInsights.trackException({ error: new Error('some error'), severityLevel: SeverityLevel.Error });
}

export function trackTrace(appInsights) {
  appInsights.trackTrace({ message: 'some trace', severityLevel: SeverityLevel.Information });
}

export function trackEvent(appInsights) {
  appInsights.trackEvent({ name: 'some event' });
}

export function throwError() {
  let foo = {
      field: { bar: 'value' }
  };

  // This will crash the app; the error will show up in the Azure Portal
  return foo.fielld.bar;
}

export function ajaxRequest() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://httpbin.org/status/200');
  xhr.send();
}

export function fetchRequest() {
  fetch('https://httpbin.org/status/200');
}
