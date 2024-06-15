import styled from 'styled-components'

const Wrapper = styled.div`
line-height: 2;
h1{ font-size: 1.4rem;}
h2{font-size: 1.2rem;}
ul{list-style-type:decimal}
section{margin-bottom:1rem}
`
const PrivatePolicy = () => {
  return (
    <Wrapper>
      <section>
        <h1>一、引言</h1>
        <p>歡迎您使用RESTART-SHOP（以下簡稱「本網站」）。我們非常重視您的隱私權保護，並承諾尊重和保護您的個人資料。本隱私權保護政策旨在向您說明我們如何收集、使用、保護和披露您的個人資料。</p>
      </section>

      <section id="section2">
        <h1>二、個人資料的收集</h1>
        <h2>收集的資料種類：</h2>
        <ul>
          <li>基本資料：如姓名、性別、生日、聯絡方式（電話、電子郵件地址）、地址等。</li>
          <li>交易資料：如購買記錄、付款資訊、物流資訊等。</li>
          <li>技術資料：如IP地址、瀏覽器類型、操作系統、訪問時間、瀏覽行為等。</li>
          <li>其他資料：您主動提供或我們根據合法目的所取得的其他資料。</li>
        </ul>
        <h2>收集方法：</h2>
        <ul>
          <li>當您註冊帳戶、下訂單、訂閱電子報、參加活動或使用本網站的其他服務時，您將主動提供相關個人資料。</li>
          <li>我們會透過Cookie、追蹤技術和其他合法方式自動收集您的技術資料。</li>
        </ul>
      </section>

      <section>
        <h1>三、個人資料的使用</h1>
        <h2>使用目的：</h2>
        <ul>
          <li>提供及管理您所要求的產品或服務。</li>
          <li>處理訂單及付款事宜。</li>
          <li>客戶服務和支援。</li>
          <li>發送有關您的帳戶或交易的通知。</li>
          <li>改善我們的網站和服務。</li>
          <li>分析市場趨勢和消費者行為。</li>
          <li>行銷和推廣我們的產品和服務（在您同意的情況下）。</li>
        </ul>
        <h2>資料保存：</h2>
        <p>我們將依據法律規定和商業需求，保存您的個人資料至不再需要為止。保存期間結束後，我們將安全地刪除或匿名化您的個人資料。</p>
      </section>

      <section>
        <h1>四、資料的保護</h1>
        <h2>安全措施：</h2>
        <p>我們採取適當的技術和組織措施，防止未經授權的存取、修改、披露或毀壞您的個人資料，包括但不限於加密技術、防火牆和安全連接（SSL）。</p>
        <h2>員工管理：</h2>
        <p>僅有經授權且需要知悉的員工才能夠接觸您的個人資料，我們定期對員工進行隱私保護和資料安全的培訓。</p>
      </section>

      <section>
        <h1>五、資料的分享與揭露</h1>
        <h2>第三方服務提供商：</h2>
        <p>我們可能會與信任的第三方服務提供商合作，協助我們運營本網站和提供服務，例如支付處理、物流配送、數據分析和行銷推廣。這些第三方僅可在必要範圍內使用您的個人資料，並需遵守嚴格的隱私保護義務。</p>
        <h2>法律需求：</h2>
        <p>當法律要求或為了保護我們的合法權益、回應政府機構的合法請求或防止違法行為時，我們可能會披露您的個人資料。</p>
      </section>

      <section>
        <h1>六、您的權利</h1>
        <h2>查詢和更正：</h2>
        <p>您有權查詢我們所持有的您的個人資料，並請求更正不正確或不完整的資料。</p>
        <h2>刪除：</h2>
        <p>在特定情況下，您可以要求我們刪除您的個人資料，例如資料已不再需要、您撤回同意或我們非法處理資料。</p>
        <h2>限制處理：</h2>
        <p>您可以要求我們限制對您個人資料的處理，例如資料有爭議或處理違法但您不希望刪除。</p>
        <h2>資料可攜性：</h2>
        <p>您有權獲取我們持有的您的個人資料副本，並將其傳輸給其他服務提供者。</p>
        <h2>異議：</h2>
        <p>您可以隨時反對我們基於合法利益處理您的個人資料，包括直接行銷目的。</p>
      </section>

      <section>
        <h1>七、Cookie和追蹤技術</h1>
        <h2>Cookie的使用：</h2>
        <p>我們使用Cookie和類似技術提升您的瀏覽體驗、分析網站流量、個性化內容和提供相關廣告。您可以透過瀏覽器設置管理或拒絕Cookie，但可能影響您使用本網站的某些功能。</p>
        <h2>第三方追蹤：</h2>
        <p>我們可能使用第三方服務，如Google Analytics，協助我們分析網站流量和用戶行為。這些第三方可能會根據其隱私政策收集和處理您的資料。</p>
      </section>

      <section>
        <h1>八、國際資料傳輸</h1>
        <p>您的個人資料可能會被傳輸到您所在國家/地區以外的其他國家/地區，這些國家/地區的資料保護法律可能不同於您的所在國。我們將採取適當的措施確保跨境資料傳輸符合適用的隱私法律和本政策的要求。</p>
      </section>

      <section id="section9">
        <h1>九、政策更新</h1>
        <p>我們可能會不時更新本隱私權保護政策，以反映我們的業務變化、法律要求或其他原因。更新後的政策將發布在本網站上，並註明更新日期。我們建議您定期查閱本政策，以了解我們如何保護您的個人資料。</p>
      </section>

      <section>
        <h1>十、聯絡我們</h1>
        <p>如果您對本隱私權保護政策有任何疑問、意見或要求，請聯絡我們：</p>
        <ul>
          <li>電子郵件：privacy@restart-shop.com</li>
          <li>電話：+886-123-456-789</li>
          <li>地址：台北市中正區重慶南路一段100號</li>
        </ul>
        <p>感謝您信任和使用RESTART-SHOP，我們將持續致力於保護您的個人資料和隱私權。</p>
      </section>
    </Wrapper>
  );
}

export default PrivatePolicy;
