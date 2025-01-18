<!DOCTYPE html>
<html>
<head>
    <title>Debt Payment Notification</title>
</head>
<body>
    <p>Postovani,</p>

    <p>Obavestavamo vas da je  <strong>{{ $debtorName }}</strong> platio za  <strong>{{ $purpose }} </strong> iznos duga od  <strong>{{ $debtAmount }} </strong> RSD dana  <strong>{{ $date }} </strong>.</p>

    <p>Srdačno,<br>{{ config('app.name') }}</p>
</body>
</html>
