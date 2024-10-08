package com.example.demo;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.VBox;
import javafx.scene.text.Font;
import javafx.stage.Stage;
import java.io.IOException;
import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;
import javax.script.ScriptException;
// This is a simple calculator that does not accept negative numbers, fractions, or parentheses.
// Some incorrectly written calculations will also not be accepted. Moreover, each run can
// only perform one calculation. If we want to perform the second calculation, we need to reload it.

public class calculator extends Application {
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(calculator.class.getResource("simple_calculator.fxml"));
        Farm_main screen = new Farm_main();
        Scene scene = new Scene(screen.getScene(), 500, 500);
        stage.setTitle("Terrible calculator!");
        stage.setScene(scene);
        stage.show();
    }
    static class Farm_main {
        static TextArea textArea = new TextArea("0");
        public BorderPane getScene() {
            BorderPane pane = new BorderPane();
            BorderPane pane_2 = new BorderPane();
            VBox KeyBoard = new VBox();
            GridPane GridPane_1 = new GridPane();
            GridPane GridPane_2 = new GridPane();
            textArea.setPrefRowCount(1);
            textArea.setPrefWidth(500);
            textArea.setFont(Font.font(50));
            textArea.setDisable(false);
            textArea.setEditable(false);
            pane_2.setCenter(textArea);
            btn btn_0 = new btn("0");
            btn btn_1 = new btn("1");
            btn btn_2 = new btn("2");
            btn btn_3 = new btn("3");
            btn btn_4 = new btn("4");
            btn btn_5 = new btn("5");
            btn btn_6 = new btn("6");
            btn btn_7 = new btn("7");
            btn btn_8 = new btn("8");
            btn btn_9 = new btn("9");
            btn btn_div = new btn("/");
            btn btn_mul = new btn("*");
            btn btn_sub = new btn("-");
            btn btn_dot = new btn(".");
            btn btn_add = new btn("+");
            btn btn_equ = new btn("=");
            btn_0.setOnAction(e -> {
                if (textArea.getText().length() == 1 && textArea.getText().charAt(0) == '0') {
                    textArea.setText("0");
                } else {
                    textArea.appendText("0");
                }
            });
            btn_1.setOnAction(e -> {
                if (textArea.getText().length() == 1 && textArea.getText().charAt(0) == '0') {
                    textArea.setText("1");
                } else {
                    textArea.appendText("1");
                }
            });
            btn_2.setOnAction(e -> {
                if (textArea.getText().length() == 1 && textArea.getText().charAt(0) == '0') {
                    textArea.setText("2");
                } else {
                    textArea.appendText("2");
                }
            });
            btn_3.setOnAction(e -> {
                if (textArea.getText().length() == 1 && textArea.getText().charAt(0) == '0') {
                    textArea.setText("3");
                } else {
                    textArea.appendText("3");
                }
            });
            btn_4.setOnAction(e -> {
                if (textArea.getText().length() == 1 && textArea.getText().charAt(0) == '0') {
                    textArea.setText("4");
                } else {
                    textArea.appendText("4");
                }
            });
            btn_5.setOnAction(e -> {
                if (textArea.getText().length() == 1 && textArea.getText().charAt(0) == '0') {
                    textArea.setText("5");
                } else {
                    textArea.appendText("5");
                }
            });
            btn_6.setOnAction(e -> {
                if (textArea.getText().length() == 1 && textArea.getText().charAt(0) == '0') {
                    textArea.setText("6");
                } else {
                    textArea.appendText("6");
                }
            });
            btn_7.setOnAction(e -> {
                if (textArea.getText().length() == 1 && textArea.getText().charAt(0) == '0') {
                    textArea.setText("7");
                } else {
                    textArea.appendText("7");
                }
            });
            btn_8.setOnAction(e -> {
                if (textArea.getText().length() == 1 && textArea.getText().charAt(0) == '0') {
                    textArea.setText("8");
                } else {
                    textArea.appendText("8");
                }
            });
            btn_9.setOnAction(e -> {
                if (textArea.getText().length() == 1 && textArea.getText().charAt(0) == '0') {
                    textArea.setText("9");
                } else {
                    textArea.appendText("9");
                }
            });

            btn_dot.setOnAction(e -> {
                textArea.appendText(".");
            });
            btn_add.setOnAction(e -> {
                textArea.appendText("+");
            });
            btn_sub.setOnAction(e -> {
                textArea.appendText("-");
            });
            btn_mul.setOnAction(e -> {
                textArea.appendText("*");
            });
            btn_div.setOnAction(e -> {
                textArea.appendText("/");
            });

            btn_equ.setOnAction(e -> {
                try {
                    textArea.setText(Action.getAns());
                } catch (ScriptException scriptException) {
                    scriptException.printStackTrace();
                }
            });
            GridPane_2.setHgap(5);
            GridPane_2.setVgap(5);
            GridPane_2.addRow(1, btn_7, btn_8, btn_9, btn_div);
            GridPane_2.addRow(2, btn_4, btn_5, btn_6, btn_mul);
            GridPane_2.addRow(3, btn_1, btn_2, btn_3, btn_sub);
            GridPane_2.addRow(4, btn_0, btn_dot, btn_add, btn_equ);
            KeyBoard.getChildren().add(GridPane_1);
            KeyBoard.getChildren().add(GridPane_2);
            pane.setPadding(new Insets(10, 10, 10, 10));
            pane.setTop(pane_2);
            pane.setCenter(KeyBoard);
            return pane;
        }
        class btn extends Button {
            btn() {
                super();
                super.setFont(Font.font(15));
                super.setPrefSize(50, 50);
            }
            btn(String text) {
                super(text);
                super.setFont(Font.font(15));
                super.setPrefSize(50, 50);
            }
        }
        static class Action {
            static String getAns() throws ScriptException {
                ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
                ScriptEngine scriptEngine = scriptEngineManager.getEngineByName("nashorn");
                String ans = String.valueOf(scriptEngine.eval(textArea.getText()));
                return String.valueOf(ans);
            }
        }
        public static void main(String[] args) {
            launch();
        }
    }
}