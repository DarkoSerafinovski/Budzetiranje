<!DOCTYPE html>
<html>
<head>
    <title>Group Expense Notification</title>
</head>
<body>
    <p>Poštovani,</p>
    <p>Korisnik <strong>{{ $payer }}</strong> je platio <strong>{{ $amount }} RSD</strong> za <strong>{{ $purpose }}</strong>, datuma <strong>{{ $date }}</strong>.</p>
    <p>Iznos koji ste mu dužni je <strong>{{ $debtAmount }} RSD</strong>.</p>
    <p>Srdačno,<br>{{ config('app.name') }}</p>
</body>
</html>
