import { useEffect } from 'react'
import styled from 'styled-components'
import { xs, md, sm } from '@/components/layout/responsive'

const Wrapper = styled.div`
  line-height: 2;
  h1 {
    font-size: 1.4rem;
    font-family: monospace;
  }
  h2 {
    font-size: 1.2rem;
  }
  ul {
    list-style-type: decimal;
  }
  section {
    margin-bottom: 1rem;
  }
  img {
    max-width: 100%;
    width: 100%;
  }
`
const ImageContainer = styled.div`
  display: ${p => (p.$size === 'default' ? 'block' : 'none')};
  ${xs({
    display: p => (p.$size === 'small' ? 'block' : 'none'),
  })}
`
const AfterSales = () => {
  return (
    <Wrapper>
      <section>
        <ImageContainer $size='small'>
          <img
            src='/images/about/returnProcessSmall.png'
            alt='returnProcessSmall'
            width='100%'
          />
        </ImageContainer>
        <ImageContainer $size='default'>
          <img src='/images/about/returnProcess.png' alt='returnProcess' />
        </ImageContainer>
        <p>
          我們重視每一位顧客的購物體驗，以下是我們的售後服務政策，請您詳閱以確保您的權益。
        </p>
      </section>
      <section>
        <h1>一般退換貨政策</h1>
        <ul>
          <li>
            <h2>退換貨期限</h2>
            自收到商品當日起計算，您有 7
            天的猶豫期來申請退換貨服務（非試用期）。
          </li>
          <li>
            <h2>申請方式</h2>
            請在猶豫期內透過 LINE 或 Email
            與我們聯繫，提供訂單編號、姓名及瑕疵圖片（如適用）。
          </li>
          <li>
            <h2>退換貨次數限制</h2>
            每筆訂單僅限申請一次退換貨服務，若退貨超過2次或單次超過2件將不再進行交易。
          </li>
        </ul>
      </section>

      <section>
        <h1>瑕疵品與錯誤商品</h1>
        <ul>
          <li>
            <h2>瑕疵認定</h2>
            包括但不限於輔料脫落、布料破損、寄錯商品。非瑕疵認定包括線頭、些許脫線、色差、尺寸誤差1-3cm等。
          </li>
          <li>
            <h2>瑕疵換貨</h2>
            由賣方承擔來回運費。請務必先與客服聯繫並提交照片，未事先告知客服則不以瑕疵品受理。
          </li>
          <li>
            <h2>非瑕疵換貨</h2>
            包裹內需附上 100 元運費，否則客服將聯繫您補齊運費。
          </li>
        </ul>
      </section>

      <section>
        <h1>退貨政策</h1>
        <ul>
          <li>
            <h2>非瑕疵退貨</h2>
            若因個人因素提出退貨，需自付 60 元運費，並從退款金額中扣除。
          </li>
          <li>
            <h2>包裝要求</h2>
            商品需保持全新、完整包裝且吊牌尚未拆剪。退回商品請務必包含所有配件、發票及包裝，以確保不影響二次銷售。
          </li>
          <li>
            <h2>無法受理退貨情況</h2>
            包括但不限於已穿出門、有煙味、下水清洗、無原出貨吊牌、超過退換期限等。
          </li>
        </ul>
      </section>

      <section>
        <h1>特殊商品退換貨政策</h1>
        <ul>
          <li>
            <h2>無法退換貨品項</h2>
            包括 NG 品、SAMPLE 樣品、50% 過季與零碼出清品、1:1
            手工大衣、飾品、淺色系衣褲、貼身打底衣物、含亞麻製品、針織/毛衣類等。
          </li>
          <li>
            <h2>貼身衣物</h2>
            基於衛生考量，貼身衣物（如內衣褲、襪子）一旦拆封即無法退換貨。
          </li>
        </ul>
      </section>

      <section>
        <h1>⚠️注意事項</h1>
        <ul>
          <li>
            <h2>商品問題</h2>
            如對尺寸或品質有疑慮，建議少量下單以免造成雙方權益損失。
          </li>
          <li>
            <h2>惡意訂購與退貨</h2>
            若有惡意訂購或退貨行為，將保留刪除會員帳號的權利。
          </li>
          <li>
            <h2>黑名單政策</h2>
            指定超商取貨無故未領者，或退換貨次數超過2次或單次退貨3件以上商品者，將加入黑名單。
          </li>
        </ul>
      </section>

      <p>
        以上內容我方保有變更修改之權利，若有任何問題，歡迎隨時聯繫客服，我們將竭誠為您服務。
      </p>
      <p>最新修訂日期：2024/05/18</p>
    </Wrapper>
  )
}

export default AfterSales
