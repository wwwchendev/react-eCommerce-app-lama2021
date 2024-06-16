import styled from 'styled-components'

const Wrapper = styled.div`
  line-height: 2;
  h1 {
    font-size: 1.4rem;
  }
  h2 {
    font-size: 1.2rem;
  }
  ul {
    list-style-type: decimal;
  }
  section {
    margin-bottom: 2.5rem;
  }
  img {
    max-width: 100%;
  }
`
const Text = styled.span`
  color: #ff6b6b;
  background-color: #f3ebe5;
  font-size: 1.3rem;
`

const Brand = () => {
  return (
    <Wrapper>
      <section>
        <img src='/images/about/brand.png' alt='returnProcess' width='100%' />
        <p>我們深信，衣著不僅僅是外表的裝飾，更是內心的一種反映。</p>
        <p>
          我們希望每一位穿上 Restart Shop
          服飾的人，都能感受到那份由內而外的自在與舒適。
        </p>
        <p>
          無論是繁忙的工作日，還是悠閒的週末時光，我們的衣服都能陪伴你度過每一刻。
        </p>
      </section>
      <section>
        <p>
          Restart Shop
          的設計靈感來自於清新的自然風光，追求簡約而不失細節的美感。
        </p>
        <p>
          我們選用高品質的面料，注重每一針每一線的工藝，只為打造出穿著舒適、款式獨特的服飾。
        </p>
        <p>
          我們希望，當你穿上 Restart Shop
          的衣服時，不僅僅是穿上了一件衣服，更是穿上了一份自信和舒適。
        </p>
      </section>
      <section>
        <p>Restart Shop 的名字也蘊含了我們的品牌哲學：</p>
        <Text $color='#ff6b6b'>自適感來自於內心，時時享受生活 :) </Text>
      </section>
      <section>
        <p>我們相信，每一天都是一個新的開始，每一刻都是享受生活的好機會。</p>
        <p>我們希望，通過我們的服飾，能夠為你帶來那份重啟生活的能量和動力。</p>
      </section>
      <br />
      <section>
        <img src='/images/about/lineOfficial.png' alt='returnProcess' />
        <p>📣ReStart有官方LINE囉！！！ 加入好友取得優惠消息🙂💬</p>
      </section>
    </Wrapper>
  )
}

export default Brand
