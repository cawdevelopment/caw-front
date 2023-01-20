import type { FC } from 'react';
import NextImage from 'next/image';

import PageWrapper from 'src/components/wrappers/Page';

const Loading: FC = () => (
  <PageWrapper
    title="Loading..."
    display="flex"
    alignItems={"center"}
    alignContent="center"
    justifyContent="center"
    padding={10}
  >
    <NextImage
      src="/assets/images/cawnet.png"
      alt="caw-image"
      className="rotate"
      width={500}
      height={500}
      style={{
        borderRadius: "100%",
        objectFit: 'scale-down'
      }}
    />
  </PageWrapper>
)

export default Loading;
