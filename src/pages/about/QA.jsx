import React from 'react'
import styled from 'styled-components'
import { Accordion } from '@/components/common'
const faqs = [
  {
    id: 1,
    question: '如何加入會員？',
    answer:
      '<p>只要您是合法登記的公司行號，包括貿易商、團體服業、網路電商等，均可申請加入會員。</p><p>加入路徑：首頁>右上角頭像點選>依照需求資訊填入資訊送出即可。</p><p>若有任何操作問題或查詢審核進度，請您加入官方LINR洽詢！</p>',
  },
  {
    id: 2,
    question: '如何更改訂單？',
    answer:
      '若已下單訂單需更改，請聯繫RESTART客服，我們將協助您處理訂單更改事宜。',
  },
  {
    id: 3,
    question: '若有大量採購是否有可以有更優惠價格呢？',
    answer:
      '各款式大量訂單另有優惠，詳情請洽詢RESTART客服專員，我們將為您提供專屬優惠。',
  },
  {
    id: 4,
    question: '收到商品有瑕疵/錯誤品項，請問該如何處理呢？',
    answer:
      '請自發貨日起30日內(含)提出申請退換貨，並將瑕疵處拍照發送至客服。若瑕疵屬於本公司作業疏忽，運費和處理費用皆由本公司負責。',
  },
  {
    id: 5,
    question: '請問有提供樣衣參考嗎？',
    answer:
      'RESTART為經銷商推出【樣衣箱】免費體驗活動，箱內包含最熱銷搶手的衣服，來回運費由RESTART負擔，並提供30天完整體驗時間。',
  },
  {
    id: 6,
    question: '請問是否一定要加入網站會員才能購買呢？',
    answer:
      '是的，您需要加入RESTART網站會員才能購買商品。不過也可以使用FB或連動加入官網會員，非常方便快速。',
  },
  {
    id: 7,
    question: '請問付款方式有哪些？',
    answer:
      'RESTART提供以下付款方式 <ul><li>信用卡（支援Visa, Master, JCB）</li><li>超商條碼、超商代碼、銀行轉帳</li><li>網銀或實體ATM</li><li>郵局無摺存款。</li></ul>',
  },
  {
    id: 8,
    question: '請問有提供拆換標？加工口袋/筆插及包裝服務嗎？',
    answer:
      'RESTART提供拆換標、加口袋、加筆插、活動背心加綁繩、魔鬼氈及包裝等加工服務。詳細需求請洽客服。',
  },
  {
    id: 9,
    question: '請問如何確認衣服型號及確認領標色碼正確性呢？',
    answer:
      '請您收到衣服後，對應型錄中的該型號領標圖案及文字，色碼部分則可對照實體色卡。若需要型錄及色卡，請在下單時備註或與客服聯繫。',
  },
  {
    id: 10,
    question: '商品寄出了嗎？配送到哪裡了呢？',
    answer:
      '<p>請點選左上角【會員專區】>選擇【訂單資訊】>物流編號，複製「物流單號」再進行查詢。</p><p>您也可以撥打語音查詢專線確認物流進度。</p>',
  },
]

const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const QA = () => {
  const renderFAQs = () => {
    return faqs.map((faq, idx) => {
      return (
        <Accordion
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          id={faq.id}
        />
      )
    })
  }
  return <Container>{renderFAQs()}</Container>
}

export default QA
