import { useMonthSwitcher } from 'hooks'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import {
    Button,
    Col,
    Row,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'
import { getFirstDayOfMonth, getLastDayOfMonth } from 'utils'
import { useTranslation } from 'react-i18next'

import 'react-calendar/dist/Calendar.css'

const MonthSwitcher = () => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const { startDate, endDate, setStartDate, setEndDate } = useMonthSwitcher()

    const getFormattedDate = date => {
        const utcDate = new Date(
            date.getTime() + date.getTimezoneOffset() * 60000,
        )
        let year = utcDate.getFullYear()
        let month = utcDate.toLocaleString('default', { month: 'long' })
        return `${t(month)} ${year}`
    }

    const updateDates = date => {
        setStartDate(getFirstDayOfMonth(date))
        setEndDate(getLastDayOfMonth(date))
    }

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Col>
            <Row className="mb-4 text-center">
                <Col xl="12">
                    <h2 className="mb-4">
                        {getFormattedDate(new Date(startDate))}
                    </h2>
                    <Button type="button" color="info" onClick={toggle}>
                        {t('Change Month')}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        role="dialog"
                        autoFocus={true}
                        centered={true}
                        className="exampleModal"
                        tabIndex="-1"
                        toggle={toggle}
                    >
                        <div className="modal-content">
                            <ModalHeader toggle={toggle}>
                                {t('Change Month')}
                            </ModalHeader>
                            <ModalBody className="text-center">
                                <div className="mb-2">
                                    <Button
                                        type="button"
                                        color="info"
                                        onClick={() => {
                                            updateDates(new Date())
                                            toggle()
                                        }}
                                    >
                                        {t('Go to Current Month')}
                                    </Button>
                                </div>
                                <hr />
                                <p className="mb-2">
                                    {t(
                                        'Select month to display budgets and expenses',
                                    )}
                                </p>
                                <Calendar
                                    className="m-auto"
                                    value={new Date(endDate)}
                                    onChangeYearUpdate={false}
                                    onChange={selectedYear => {
                                        updateDates(selectedYear)
                                        toggle()
                                    }}
                                    maxDetail="year"
                                    minDetail="month"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    color="success"
                                    onClick={toggle}
                                >
                                    {t('Apply')}
                                </Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                </Col>
            </Row>
        </Col>
    )
}

export default MonthSwitcher