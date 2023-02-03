import {
Wrapper,
TopWrapper,
SearchHeader,
ProfileHeader,
SearchImg,
ProfileRight,
ProfileLeftText,
ProfileImg,
ProfileName,
RightArrowImg,
MenuHeader,
MenuText,
MenuFaqText,
MiddleWrapper,
Contents,
ContentRow,
RowLeftContent,
RowRightContent,
QNumber,
ContentTitle,
BottomWrapper,
FooterWrapper,
FooterIcon,
FooterText,
FooterMymenuText,
Hr,

} from '../../styles/faqStyle'

export default function FaqPage(){
    return(
        <Wrapper>
            <TopWrapper>
                <SearchHeader>
                    <SearchImg src="/search.png"></SearchImg>
                </SearchHeader>
                <ProfileHeader>
                    <ProfileLeftText>마이</ProfileLeftText>
                    <ProfileRight>
                        <ProfileImg src="/profile.png"></ProfileImg>
                        <ProfileName>임정아</ProfileName>
                        <RightArrowImg src="/right_arrow.png"></RightArrowImg>
                    </ProfileRight>
                </ProfileHeader>
                <MenuHeader>
                    <MenuText>공지사항</MenuText>
                    <MenuText>이벤트</MenuText>
                    <MenuFaqText>FAQ</MenuFaqText>
                    <MenuText>Q&A</MenuText>
                </MenuHeader>
            </TopWrapper>
            <Hr></Hr>
            <MiddleWrapper>
                <Contents>
                    <ContentRow>
                        <RowLeftContent>
                            <QNumber>Q. 01</QNumber>
                            <ContentTitle>리뷰 작성은 어떻게 하나요?</ContentTitle>
                        </RowLeftContent>
                        <RowRightContent src="/bottom_arrow.png">

                        </RowRightContent>
                    </ContentRow>
                    <ContentRow>
                        <RowLeftContent>
                            <QNumber>Q. 02</QNumber>
                            <ContentTitle>리뷰 수정/삭제는 어떻게 하나요?</ContentTitle>
                        </RowLeftContent>
                        <RowRightContent src="/bottom_arrow.png">

                        </RowRightContent>
                    </ContentRow>
                    <ContentRow>
                        <RowLeftContent>
                            <QNumber>Q. 03</QNumber>
                            <ContentTitle>아이디/비밀번호를 잊어버렸어요.</ContentTitle>
                        </RowLeftContent>
                        <RowRightContent src="/bottom_arrow.png">

                        </RowRightContent>
                    </ContentRow>
                    <ContentRow>
                        <RowLeftContent>
                            <QNumber>Q. 04</QNumber>
                            <ContentTitle>회원탈퇴를 하고싶어요.</ContentTitle>
                        </RowLeftContent>
                        <RowRightContent src="/bottom_arrow.png">

                        </RowRightContent>
                    </ContentRow>
                    <ContentRow>
                        <RowLeftContent>
                            <QNumber>Q. 05</QNumber>
                            <ContentTitle>출발지 설정은 어떻게 하나요?</ContentTitle>
                        </RowLeftContent>
                        <RowRightContent src="/bottom_arrow.png">

                        </RowRightContent>
                    </ContentRow>
                    <ContentRow>
                        <RowLeftContent>
                            <QNumber>Q. 06</QNumber>
                            <ContentTitle>비밀번호를 변경하고 싶어요.</ContentTitle>
                        </RowLeftContent>
                        <RowRightContent src="/bottom_arrow.png">

                        </RowRightContent>
                    </ContentRow>
                </Contents>
            </MiddleWrapper>
            <Hr></Hr>
            <BottomWrapper>
                <FooterWrapper>
                    <FooterIcon src="/home.png"></FooterIcon>
                    <FooterText>홈</FooterText>
                </FooterWrapper>
                <FooterWrapper>
                    <FooterIcon src="/map.png"></FooterIcon>
                    <FooterText>잇츠로드</FooterText>
                </FooterWrapper>
                <FooterWrapper>
                    <FooterIcon src="/like.png"></FooterIcon>
                    <FooterText>마이찜</FooterText>
                </FooterWrapper>
                <FooterWrapper>
                    <FooterIcon src="/mymenu.png"></FooterIcon>
                    <FooterMymenuText>마이</FooterMymenuText>
                </FooterWrapper>
            </BottomWrapper>
        </Wrapper>
    )
}