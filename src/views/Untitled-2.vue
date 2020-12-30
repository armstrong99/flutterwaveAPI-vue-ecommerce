  <section class="flex mt-8 justify-around flex-wrap">
            <article v-for="(ik, i) in farmRecs" id="articleCon" class="transition duration-500 ease-in-out hover:bg-green-900 transform hover:-translate-y-1 hover:scale-110 hover:font-sans hover:font-light rounded-xl my-4 hover:cursor-pointer hover:text-gray-200 hover:shadow-md bg-green-100 hover:z-40 z-20" :key="i">
              <img :src="ik.imgUrl" alt="farm harvest" class="h-32 w-full" />
              <h3 class="text-left font-sans font-bold pl-1 text-sm">
                {{ ik.harvest }}
              </h3>
              <p class="text-left font-sans font-bold mt-1 pl-1 text-xs" style="color: brown">
                {{ ik.timeStamp }}
              </p>
              <p class="text-left font-sans font-bold pl-1 text-xs" style="color: brown">
                {{ ik.plot }}
              </p>
              <section class="px-2">
                <p class="text-sm mt-2 rounded-md font-sans font-semibold">
                  {{ ik.bio }}
                </p>
              </section>
            </article>
          </section>