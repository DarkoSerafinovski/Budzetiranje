<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use App\Models\User;
use App\Models\DebtClaim;
use App\Models\GroupExpense;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
class DebtPaidNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $debtor;
    public $expense;
    public $debt;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $debtor, GroupExpense $expense, DebtClaim $debt)
    {
        $this->debtor = $debtor;
        $this->expense = $expense;
        $this->debt = $debt;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Debt Payment Notification')
            ->view('emails.debt_paid')
            ->with([
                'debtorName' => $this->debtor->username,
                'purpose' => $this->expense->purpose,
                'debtAmount' => $this->debt->amount,
                'date' => now()->format('d.m.Y'),
            ]);
    }
}
