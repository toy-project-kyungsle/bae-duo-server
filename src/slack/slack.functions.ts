import { Funding } from 'src/funding/funding.entity';

export const getFullStringDate = (date: Date) => {
  if (!date) return null;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return month + '월 ' + day + '일 ' + hour + '시 ' + minute + '분';
};

export const getCreateFundingMessage = (createdFunding: Funding) => {
  return `
오늘 배달 시켜 드실 분~
브랜드 : ${createdFunding.brand}
마감 시간 : ${getFullStringDate(new Date(createdFunding.deadline)) || '미정'}
최소 인원 : ${createdFunding.minMember || '미정'}
최소 금액 : ${createdFunding.minPrice || '미정'}
전하는 말 : ${createdFunding.description || '없읍니다'}
    `;
};
