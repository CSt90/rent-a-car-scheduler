'use client'

import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, TimelineViews, Inject, ResourcesDirective, ResourceDirective, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './timeline-resources.css';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { registerLicense } from '@syncfusion/ej2-base'
import * as dataSource from './datasource.json';
import { Week } from '@syncfusion/ej2-react-schedule';
/**
 * schedule room scheduler sample
 */
const TimelineResource = () => {

    registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXpedXVURWRYU0F0WEdWYUA=');

    const data = extend([], dataSource.fleetData, null, true);
    let scheduleObj = useRef(null);
    const ownerData = [
        { text: 'Suzuki Jimny', id: 1, color: '#ea7a57', carColor: "Λευκό", category: "A2", licencePlate: "ΡΕΖ 9719"},
        { text: 'Citroen C4', id: 2, color: '#7fa900', carColor: "Κίτρινο", category: "A2", licencePlate: "ΡΕΒ 6428"}
    ];
    const getCarName = (value) => {
        return value.resourceData[value.resource.textField];
    };
    const getCarLp = (value) => {
        return value.resourceData.licencePlate;
    };
    const getCarColor = (value) => {
        return value.resourceData.carColor;
    };
    const getCarCategory = (value) => {
        return value.resourceData.category;
    };
    // const getRoomType = (value) => {
    //     return value.resourceData.type;
    // };
    // const getRoomCapacity = (value) => {
    //     return value.resourceData.capacity;
    // };
    const isReadOnly = (endDate) => {
        return (endDate < new Date(2025, 4, 2, 0, 0));
    };
    const resourceHeaderTemplate = (props) => {
        return (<div className="template-wrap">
                <div className="car-name">{getCarName(props)}</div>
                <div className="car-lp">{getCarLp(props)}</div>
                <div className="car-color">{getCarColor(props)}</div>
                <div className="car-cat">{getCarCategory(props)}</div>
            </div>);
    };
    const onActionBegin = (args) => {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            let data = args.data instanceof Array ? args.data[0] : args.data;
            args.cancel = !scheduleObj.current.isSlotAvailable(data);
        }
    };
    const onEventRendered = (args) => {
        let data = args.data;
        if (isReadOnly(data.EndTime)) {
            args.element.setAttribute('aria-readonly', 'true');
            args.element.classList.add('e-read-only');
        }
    };
    const onRenderCell = (args) => {
        if (args.element.classList.contains('e-work-cells')) {
            if (args.date < new Date(2025, 4, 3, 0, 0)) {
                args.element.setAttribute('aria-readonly', 'true');
                args.element.classList.add('e-read-only-cells');
            }
        }
        if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
            let target = args.element.querySelector('.e-resource-text');
            target.innerHTML = '<div class="name">Όχημα</div><div class="lp">Α/Κ</div><div class="color">Χρώμα</div><div class="cat">Κατηγ.</div>';
        }
    };
    const onPopupOpen = (args) => {
        let data = args.data;
        if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
            let target = (args.type === 'RecurrenceAlert' ||
                args.type === 'DeleteAlert') ? args.element[0] : args.target;
            if (!isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
                if ((target.classList.contains('e-read-only-cells')) ||
                    (!scheduleObj.current.isSlotAvailable(data))) {
                    args.cancel = true;
                }
            }
            else if (!isNullOrUndefined(target) && target.classList.contains('e-appointment') &&
                (isReadOnly(data.EndTime))) {
                args.cancel = true;
            }
        }
    };
    return (<div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent 
                    cssClass='timeline-resource' 
                    ref={scheduleObj} 
                    width='100%' 
                    height='100%' 
                    selectedDate={new Date()} 
                    workHours={{ start: '08:00', end: '23:00' }} 
                    timeScale={{ interval: 300, slotCount: 1 }} 
                    resourceHeaderTemplate={resourceHeaderTemplate} 
                    eventSettings={{ 
                        dataSource: data, fields: { 
                            id: 'Id',
                            subject: { title: 'Τοποθεσία', name: 'Subject' },
                            // description: { title: 'Comments', name: 'Description' }, 
                            startTime: { title: 'From', name: 'StartTime' }, 
                            endTime: { title: 'To', name: 'EndTime' } } }} 
                            eventRendered={onEventRendered} 
                            popupOpen={onPopupOpen} 
                            actionBegin={onActionBegin} 
                            renderCell={onRenderCell} 
                            group={{ enableCompactView: false, resources: ['MeetingRoom'] }}
                    >
                        <ResourcesDirective>
                            <ResourceDirective field='CarID' title='Όχημα' name='MeetingRoom' allowMultiple={false} dataSource={ownerData} textField='text' idField='id' colorField='color'/>
                        </ResourcesDirective>
                        <ViewsDirective>
                            <ViewDirective option='TimelineDay'/>
                            <ViewDirective option='TimelineWeek'/>
                        </ViewsDirective>
                        <Inject services={[TimelineViews, Resize, DragAndDrop]}/>
                    </ScheduleComponent>
                </div>
            </div>

        </div>);
};
export default TimelineResource;

// const Month = dynamic(() =>
//   import('@syncfusion/ej2-react-schedule').then((mod) => mod.Month)
// )