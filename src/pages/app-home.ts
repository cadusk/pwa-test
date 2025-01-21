import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../styles/shared-styles';

@customElement('app-home')
export class AppHome extends LitElement {

  @property() phoneNumber = '';
  @property() selectedDDI = '+1'; //default DDI
  @property() ddiList = [
    { country: 'US', code: '+1' },
    { country: 'Brazil', code: '+55' },
  ];

  updatePhoneNumber(e: Event) {
    const target = e.target as HTMLInputElement;
    this.phoneNumber = target.value;
  }

  updateSelectedDDI(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.selectedDDI = target.value;
  }

  makeCall() {
    if (this.phoneNumber) {
      const fullPhoneNumber = `${this.selectedDDI}${this.phoneNumber}`;
      window.location.href = `tel:${fullPhoneNumber}`;
    } else {
      alert('Please, enter a valid phone number.');
    }
  }

  static styles = [
    styles,
    css`
    #welcomeBar {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }


    #callInput select,
    #callInput input {
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    #callInput button {
      padding: 8px 16px;
      font-size: 16px;
      background-color: #0078d7;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    #callInput button:hover {
      background-color: #005a9e;
    }

    #welcomeCard,
    #infoCard {
      padding: 18px;
      padding-top: 0px;
    }

    sl-card::part(footer) {
      display: flex;
      justify-content: flex-end;
    }

    @media(min-width: 750px) {
      sl-card {
        width: 70vw;
      }
    }


    @media (horizontal-viewport-segments: 2) {
      #welcomeBar {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
      }

      #welcomeCard {
        margin-right: 64px;
      }
    }
  `];

  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/
    console.log('This is your home page');
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      });
    }
  }

  render() {
    return html`
      <app-header></app-header>

      <main>
        <div id="welcomeBar">
          <sl-card id="welcomeCard">
            <div id="callInput">
              <select @change=${this.updateSelectedDDI}>
                ${this.ddiList.map(
                  (ddi) => html`<option value="${ddi.code}">${ddi.country} (${ddi.code})</option>`
                )}
              </select>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Enter a Phone Pumber"
                @input=${this.updatePhoneNumber}>
              <button @click=${this.makeCall}>Call</button>
            </div>
          </sl-card>

          <sl-card id="infoCard">

          </sl-card>

        </div>
      </main>
    `;
  }
}
