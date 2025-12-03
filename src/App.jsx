import { useState } from 'react';
import './App.css';
import LogoNuansaLegal from './assets/LogoNuansaLegal.png';

function App() {
  const [activeTab, setActiveTab] = useState('pph21');
  
  // PPh 21 States
  const [statusKawin, setStatusKawin] = useState('Tidak Kawin');
  const [tanggungan, setTanggungan] = useState('0');
  const [tunjanganPajak, setTunjanganPajak] = useState('Gross');
  const [gaji, setGaji] = useState('');
  const [tunjanganPph, setTunjanganPph] = useState('');
  const [tunjanganLainnya, setTunjanganLainnya] = useState('');
  const [honorarium, setHonorarium] = useState('');
  const [premiAsuransi, setPremiAsuransi] = useState('');
  const [natura, setNatura] = useState('');
  const [bonus, setBonus] = useState('');
  const [penghasilanBruto, setPenghasilanBruto] = useState('');
  const [hasilPph21, setHasilPph21] = useState('');
  
  // PPh 23 States
  const [kodeObjek23, setKodeObjek23] = useState('');
  const [penghasilanBruto23, setPenghasilanBruto23] = useState('');
  const [tarif23, setTarif23] = useState('2');
  const [hasilPph23, setHasilPph23] = useState('');
  
  // PPh 4(2) States
  const [kodeObjek42, setKodeObjek42] = useState('');
  const [penghasilanBruto42, setPenghasilanBruto42] = useState('');
  const [tarif42, setTarif42] = useState('10');
  const [hasilPph42, setHasilPph42] = useState('');
  
  // PPN States
  const [dpp, setDpp] = useState('');
  const [tarifPpn, setTarifPpn] = useState('11');
  const [ppn, setPpn] = useState('');
  const [hargaSetelahPpn, setHargaSetelahPpn] = useState('');

  const hitungPph21 = () => {
    const total = 
      parseFloat(gaji || 0) + 
      parseFloat(tunjanganPph || 0) + 
      parseFloat(tunjanganLainnya || 0) + 
      parseFloat(honorarium || 0) + 
      parseFloat(premiAsuransi || 0) + 
      parseFloat(natura || 0) + 
      parseFloat(bonus || 0) + 
      parseFloat(penghasilanBruto || 0);
    
    // Simplified calculation - in real app, implement proper PTKP and tax brackets
    const ptkp = statusKawin === 'Tidak Kawin' ? 54000000 : 58500000;
    const pkp = Math.max(0, (total * 12) - ptkp);
    const pph = pkp * 0.05 / 12; // Simplified 5% rate
    
    setHasilPph21(`Rp ${pph.toLocaleString('id-ID')}`);
  };

  const hitungPph23 = () => {
    const bruto = parseFloat(penghasilanBruto23 || 0);
    const rate = parseFloat(tarif23 || 0) / 100;
    const result = bruto * rate;
    setHasilPph23(`Rp ${result.toLocaleString('id-ID')}`);
  };

  const hitungPph42 = () => {
    const bruto = parseFloat(penghasilanBruto42 || 0);
    const rate = parseFloat(tarif42 || 0) / 100;
    const result = bruto * rate;
    setHasilPph42(`Rp ${result.toLocaleString('id-ID')}`);
  };

  const hitungPpn = () => {
    const dppValue = parseFloat(dpp || 0);
    const rate = parseFloat(tarifPpn || 0) / 100;
    const ppnValue = dppValue * rate;
    const total = dppValue + ppnValue;
    
    setPpn(`Rp ${ppnValue.toLocaleString('id-ID')}`);
    setHargaSetelahPpn(`Rp ${total.toLocaleString('id-ID')}`);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo">
              <img src={LogoNuansaLegal} alt="Nuansa Legal" style={{ width: '98px', height: '98px', objectFit: 'contain' }} />
            </div>
          </div>
          <div className="header-title">
            <h1>KALKULATOR PPH</h1>
            <p>Hitung pajak penghasilan dengan mudah</p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'pph21' ? 'active' : ''}`}
            onClick={() => setActiveTab('pph21')}
          >
            PPH21
          </button>
          <button 
            className={`tab ${activeTab === 'pph23' ? 'active' : ''}`}
            onClick={() => setActiveTab('pph23')}
          >
            PPH23
          </button>
          <button 
            className={`tab ${activeTab === 'pph42' ? 'active' : ''}`}
            onClick={() => setActiveTab('pph42')}
          >
            PPH 4 Ayat (2)
          </button>
          <button 
            className={`tab ${activeTab === 'ppn' ? 'active' : ''}`}
            onClick={() => setActiveTab('ppn')}
          >
            PPN
          </button>
        </div>

        <div className="calculator-container">
          {activeTab === 'pph21' && (
            <div className="calculator-content">
              <h2>Kalkulator PPh21</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Status Kawin:</label>
                  <select value={statusKawin} onChange={(e) => setStatusKawin(e.target.value)}>
                    <option>Tidak Kawin</option>
                    <option>Kawin</option>
                    <option>Kawin Istri Bekerja</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Tanggungan:</label>
                  <select value={tanggungan} onChange={(e) => setTanggungan(e.target.value)}>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tunjangan Pajak:</label>
                <select value={tunjanganPajak} onChange={(e) => setTunjanganPajak(e.target.value)}>
                  <option>Gross</option>
                  <option>Nett</option>
                  <option>Gross Up</option>
                </select>
              </div>

              <div className="form-group">
                <label>Gaji/Pensiun:</label>
                <input 
                  type="number" 
                  value={gaji} 
                  onChange={(e) => setGaji(e.target.value)}
                  placeholder="Masukkan jumlah"
                />
              </div>

              <div className="form-group">
                <label>Tunjangan PPh:</label>
                <input 
                  type="number" 
                  value={tunjanganPph} 
                  onChange={(e) => setTunjanganPph(e.target.value)}
                  placeholder="Masukkan jumlah"
                />
              </div>

              <div className="form-group">
                <label>Tunjangan Lainnya:</label>
                <input 
                  type="number" 
                  value={tunjanganLainnya} 
                  onChange={(e) => setTunjanganLainnya(e.target.value)}
                  placeholder="Masukkan jumlah"
                />
              </div>

              <div className="form-group">
                <label>Honorarium:</label>
                <input 
                  type="number" 
                  value={honorarium} 
                  onChange={(e) => setHonorarium(e.target.value)}
                  placeholder="Masukkan jumlah"
                />
              </div>

              <div className="form-group">
                <label>Premi Asuransi:</label>
                <input 
                  type="number" 
                  value={premiAsuransi} 
                  onChange={(e) => setPremiAsuransi(e.target.value)}
                  placeholder="Masukkan jumlah"
                />
              </div>

              <div className="form-group">
                <label>Natura:</label>
                <input 
                  type="number" 
                  value={natura} 
                  onChange={(e) => setNatura(e.target.value)}
                  placeholder="Masukkan jumlah"
                />
              </div>

              <div className="form-group">
                <label>Bonus/THR:</label>
                <input 
                  type="number" 
                  value={bonus} 
                  onChange={(e) => setBonus(e.target.value)}
                  placeholder="Masukkan jumlah"
                />
              </div>

              <div className="form-group">
                <label>Penghasilan Bruto:</label>
                <input 
                  type="number" 
                  value={penghasilanBruto} 
                  onChange={(e) => setPenghasilanBruto(e.target.value)}
                  placeholder="Masukkan jumlah"
                />
              </div>

              <button className="btn-calculate" onClick={hitungPph21}>
                Hitung PPh 21
              </button>

              <div className="hasil">
                <h3>Hasil Perhitungan</h3>
                <p><strong>PPh 21 Terutang:</strong> {hasilPph21 || '- Rp'}</p>
              </div>
            </div>
          )}

          {activeTab === 'pph23' && (
            <div className="calculator-content">
              <h2>PPH23</h2>
              
              <div className="form-group">
                <label>Kode Objek Pajak</label>
                <select value={kodeObjek23} onChange={(e) => setKodeObjek23(e.target.value)}>
                  <option value="">Pilih Kode</option>
                  <option>Dividen</option>
                  <option>Bunga</option>
                  <option>Royalti</option>
                  <option>Sewa</option>
                  <option>Jasa</option>
                </select>
              </div>

              <div className="form-group">
                <label>Penghasilan Bruto (Rp)</label>
                <input 
                  type="number" 
                  value={penghasilanBruto23} 
                  onChange={(e) => setPenghasilanBruto23(e.target.value)}
                  placeholder="Masukkan jumlah"
                />
              </div>

              <div className="form-group">
                <label>Tarif (%)</label>
                <input 
                  type="number" 
                  value={tarif23} 
                  onChange={(e) => setTarif23(e.target.value)}
                />
              </div>

              <button className="btn-calculate" onClick={hitungPph23}>
                Hitung PPh 23
              </button>

              <div className="hasil">
                <h3>Hasil Perhitungan</h3>
                <p><strong>PPh 23 Terutang:</strong> {hasilPph23 || '- Rp'}</p>
              </div>
            </div>
          )}

          {activeTab === 'pph42' && (
            <div className="calculator-content">
              <h2>PPh 4(2)</h2>
              
              <div className="form-group">
                <label>Kode Objek Pajak</label>
                <select value={kodeObjek42} onChange={(e) => setKodeObjek42(e.target.value)}>
                  <option value="">Pilih Kode</option>
                  <option>Sewa Tanah/Bangunan</option>
                  <option>Jasa Konstruksi</option>
                  <option>Dividen</option>
                  <option>Bunga Deposito</option>
                </select>
              </div>

              <div className="form-group">
                <label>Penghasilan Bruto (Rp)</label>
                <input 
                  type="number" 
                  value={penghasilanBruto42} 
                  onChange={(e) => setPenghasilanBruto42(e.target.value)}
                  placeholder="Masukkan jumlah"
                />
              </div>

              <div className="form-group">
                <label>Tarif (%)</label>
                <input 
                  type="number" 
                  value={tarif42} 
                  onChange={(e) => setTarif42(e.target.value)}
                />
              </div>

              <button className="btn-calculate" onClick={hitungPph42}>
                Hitung PPh 4(2)
              </button>

              <div className="hasil">
                <h3>Hasil Perhitungan</h3>
                <p><strong>PPh 4(2) Terutang:</strong> {hasilPph42 || '- Rp'}</p>
              </div>
            </div>
          )}

          {activeTab === 'ppn' && (
            <div className="calculator-content">
              <h2>PPN</h2>
              
              <div className="form-group">
                <label>DPP (Dasar Pengenaan Pajak) (Rp)</label>
                <input 
                  type="number" 
                  value={dpp} 
                  onChange={(e) => setDpp(e.target.value)}
                  placeholder="Masukkan jumlah"
                />
              </div>

              <div className="form-group">
                <label>Tarif (%)</label>
                <input 
                  type="number" 
                  value={tarifPpn} 
                  onChange={(e) => setTarifPpn(e.target.value)}
                />
              </div>

              <button className="btn-calculate" onClick={hitungPpn}>
                Hitung PPN
              </button>

              <div className="hasil">
                <h3>Hasil Perhitungan</h3>
                <p><strong>PPN:</strong> {ppn || '- Rp'}</p>
                <p><strong>Harga Setelah PPN:</strong> {hargaSetelahPpn || '- Rp'}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <div className="footer-content">
            <p>© 2025 Perhitungan PPh - Hitung Pajak Penghasilan</p>
            <p className="footer-note">© 2025 Kalkulator PPh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;