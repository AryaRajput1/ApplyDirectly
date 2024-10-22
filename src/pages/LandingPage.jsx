import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Link } from "react-router-dom"
import companies from '../data/companies'
import Autoplay from "embla-carousel-autoplay"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import faqs from '../data/faqs'

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm-gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="text-[68px] flex flex-col items-center justify-center font-bold text-xl sm:text-6xl gap-4 sm:gap-5">
          <span>It's Easy to find {" "} </span>
          <span>Your <span className='text-blue-700'>Dream Job</span></span>
          <span className="text-xs font-normal sm:text-lg">By just filling google forms and you will get referrals fast.</span>
        </h1>
      </section>
      <div className="flex gap-3 justify-center flex-col items-center sm:flex-row sm:gap-10">

        <Link to='/job'>
          <Button variant='blue' size='xl'>Find Jobs</Button>
        </Link>
        <Link to='/find-job'>
          <Button variant='outline' size='xl'>Post Jobs</Button>
        </Link>
      </div>

      {/* crousel */}
      <section className="my-10 max-w-xl md:max-w-full mx-5 ">
        <Carousel className="w-full" opts={{
          align: "start",
          loop: true,
        }} plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}>
          <CarouselContent className="flex gap-5 md:gap-20 items-center ">
            {companies.map((item, index) => (
              <CarouselItem key={index} className="basis-1/4 lg:basis-1/6">
                <div className="">
                  <img src={item.path} className="h-5 sm:h-14 object-contain" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>


<section>
  <h1 className="text-2xl font-bold border-b-2 py-2 text-blue-700 ">FAQS</h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={index+1}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </section>
    </main>
  )
}

export default LandingPage
