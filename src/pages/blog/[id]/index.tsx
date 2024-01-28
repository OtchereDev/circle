import { useRouter } from "next/router";
import Image from "next/image";

import { api } from "~/utils/api";

import MainLayout from "~/layout/MainLayout";

const Index = () => {
  const router = useRouter();
  const query = router.query;
  const { data } = api.post.getPost.useQuery({ postId: query.id as string });
  return (
    <MainLayout>
      <div className="px-5 pb-20 lg:mx-auto lg:w-[60%] lg:pt-10">
        <div className="relative h-[318px] overflow-hidden rounded-[5px]">
          <Image
            src={data?.post?.image ?? ""}
            alt="legal councel image"
            className="h-full w-full object-cover"
            fill
          />
        </div>
        <p className="mt-1 text-[13px] text-[#4B5563] lg:mt-2 lg:text-sm">
          Posted: Wed, 30th Aug 2023
        </p>

        <div className="mt-5 lg:mt-7">
          <h1 className="text-2xl font-semibold text-[#374151] lg:text-[32px]">
            {data?.post?.blogTitle}
          </h1>
          <p className="mt-2 inline-block rounded-[7px] bg-[#F3F4F6] px-2 py-1 text-xs text-[#374151] lg:mt-3">
            Legal Guidance
          </p>

          <div className="mt-6 flex flex-col gap-4 text-[15px] text-[#6B7280] lg:text-base">
            {data?.post?.content?.map((content) => (
              <div key={content.sectionTitle}>
                <h3 className="text-lg">{content.sectionTitle}</h3>
                <p>{content.text}</p>
              </div>
            ))}

            <p>{data?.post?.conclusion}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
