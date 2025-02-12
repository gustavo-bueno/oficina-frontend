import MeetingCard from "@/app/components/MeetingCard";
import { useState } from "react";
import CreateMeetingModal, { MeetingData } from "./CreateMeetingModal";
import MeetingDetailsModal from "./MeetingModal";

type MeetingsProps = {
  groupId: string;
};

type MeetingProps = MeetingData & { completed: boolean };

const Meetings = ({ groupId }: MeetingsProps) => {
  const [meetings, setMeetings] = useState<MeetingProps[]>([
    {
      number: "2",
      date: "2025-02-18",
      mentors: ["Ana", "Maria"],
      obs: "Citar ferramentas gratuitas disponíveis",
      subject: "Plano de negócios",
      completed: false,
    },
    {
      number: "3",
      date: "2025-02-12",
      mentors: ["Ana", "Maria"],
      obs: "Citar ferramentas gratuitas disponíveis",
      subject: "Plano de negócios",
      completed: true,
    },
  ]);
  const [meetingToShow, setMeetingToShow] = useState<MeetingProps>({
    number: "",
    date: "",
    mentors: [],
    subject: "",
    completed: false,
  });
  const [showCreateMeetingModal, setShowCreateMeetingModal] = useState(false);
  const [showMeetingDetailsModal, setShowMeetingDetailsModal] = useState(false);

  const completedMeetings = meetings.filter((meeting) => meeting.completed);
  const upcomingMeetings = meetings.filter((meeting) => !meeting.completed);

  return (
    <div>
      <MeetingDetailsModal
        {...meetingToShow}
        open={showMeetingDetailsModal}
        close={() => setShowMeetingDetailsModal(false)}
      />
      <CreateMeetingModal
        open={showCreateMeetingModal}
        close={() => setShowCreateMeetingModal(false)}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-bold text-primary">Cronograma</h2>
        <button
          onClick={() => setShowCreateMeetingModal(true)}
          className="text-[22px] text-secondary font-bold"
        >
          Adicionar encontro
        </button>
      </div>
      <div className="flex flex-wrap gap-[32px] mt-5 mb-10 overflow-x-auto pb-1">
        {upcomingMeetings.map((meeting) => (
          <MeetingCard
            key={meeting.number}
            {...meeting}
            date={new Date(meeting.date)}
            onClick={() => {
              setMeetingToShow(meeting);
              setShowMeetingDetailsModal(true);
            }}
          />
        ))}
      </div>
      <h2 className="text-[28px] font-bold text-primary">
        Encontros concluídos
      </h2>
      <div className="flex flex-wrap gap-[32px] mt-5 mb-10 overflow-x-auto pb-1">
        {completedMeetings.map((meeting) => (
          <MeetingCard
            key={meeting.number}
            {...meeting}
            date={new Date(meeting.date)}
            onClick={() => {
              setMeetingToShow(meeting);
              setShowMeetingDetailsModal(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Meetings;
