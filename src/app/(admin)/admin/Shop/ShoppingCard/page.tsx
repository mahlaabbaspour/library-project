'use client'

import { useState } from 'react'

import { Card, CardContent, Divider, Step, StepLabel, Stepper, Typography } from '@mui/material'

import StepperWrapper from '@/@core/styles/stepper'
import Breadcrumb from '@/components/Breakcrumb'

import StepOne from '@/components/pages/admin/Shop/ShopCard/CardStepper/StepOne'
import StepTwo from '@/components/pages/admin/Shop/ShopCard/CardStepper/StepTwo'
import StepperCustomDot from '@/components/pages/admin/Shop/ShopCard/CardStepper/StepperCustomDot'

const steps = [
  {
    title: 'سبد خرید',
    subtitle: 'بررسی سفارش'
  },
  {
    title: 'پرداخت',
    subtitle: 'انتخاب روش پرداخت'
  }
]

export default function ShoppingCard() {
  const [activeStep, setActiveStep] = useState(0)
  const [invoiceId, setInvoiceId] = useState<number | null>(null)

  const items = [
    { title: 'داشبورد', to: '/admin' },
    { title: 'فروشگاه کتاب', to: '/admin/Shop' },
    { title: 'سبد خرید' }
  ]

  const handleNext = () => {
    setActiveStep(prev => prev + 1)
  }

  const handleBack = () => {
    setActiveStep(prev => prev - 1)
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <StepOne handleNext={handleNext} setInvoiceId={setInvoiceId} />

      case 1:
        return <StepTwo handleBack={handleBack} invoiceId={invoiceId} />

      default:
        return null
    }
  }

  return (
    <>
      <Breadcrumb items={items} />

      <Card>
        <CardContent>
          <StepperWrapper>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(step => (
                <Step key={step.title}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>

                        <Typography variant='caption' className='step-subtitle'>
                          {step.subtitle}
                        </Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </StepperWrapper>
        </CardContent>

        <Divider />

        <CardContent>{renderStep()}</CardContent>
      </Card>
    </>
  )
}
