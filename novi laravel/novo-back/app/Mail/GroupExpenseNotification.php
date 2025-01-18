<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;



class GroupExpenseNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $payer;
    public $amount;
    public $purpose;
    public $date;
    public $debtAmount;

    /**
     * Create a new message instance.
     */
    public function __construct($payer, $amount, $purpose, $date, $debtAmount)
    {
        $this->payer = $payer;
        $this->amount = $amount;
        $this->purpose = $purpose;
        $this->date = Carbon::parse($date)->format('d.m.Y');
        $this->debtAmount = $debtAmount;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Group Expense Notification')
            ->view('emails.group_expense_notification');
    }

}
