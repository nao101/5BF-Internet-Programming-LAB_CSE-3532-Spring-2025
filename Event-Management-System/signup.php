<?php
include 'db.php';

echo "<pre>";
print_r($_POST);
echo "</pre>";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (
        isset($_POST['name']) && 
        isset($_POST['email']) && 
        isset($_POST['password']) && 
        isset($_POST['confirm_password'])
    ) {
        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];

        if ($password !== $confirm_password) {
            echo "❌ Passwords do not match.";
            exit;
        }

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $hashed_password);

        if ($stmt->execute()) {
            echo "✅ Signup successful!";
        } else {
            echo "❌ Signup failed: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "❌ Some fields are missing.";
    }
} else {
    echo "❌ Invalid request method.";
}

$conn->close();
?>
