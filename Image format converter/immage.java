package com.example.demo;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.FileChooser;
import javafx.stage.Stage;
import javafx.geometry.Insets;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.text.Font;
import java.io.*;

//class diagram:
//class public class image contains only one class: private static class Farm_main.

public class immage extends Application {
    //The following part is the stage layout and calling Farm_main
    public void start(Stage stage) throws IOException {
        Farm_main screen = new Farm_main();
        Scene scene = new Scene(screen.getScene(), 1000, 700);
        stage.setTitle("image processor");
        stage.setScene(scene);
        stage.show();
    }
//This part is the main part of the program. The private attribute ensures encapsulation.
// At the same time, only one farm_main is instantiated, and the Singleton pattern makes
// it occupy very little memory.
    private static class Farm_main {
        static TextArea textArea = new TextArea("Welcome to Image Processor");
        Button btn_1 = new Button("Convert format to PNG");
        Button btn_2 = new Button("Convert to GIF");
        Button btn_3 = new Button("Convert to JPEG");
        public BorderPane getScene() {
            //Below are some button and display box layouts
            //The font size is large to ensure that users can read it clearly
            BorderPane pane = new BorderPane();
            BorderPane pane_2 = new BorderPane();
            VBox KeyBoard = new VBox();
            HBox box = new HBox();
            ImageView imageView = new ImageView();
            box.getChildren().add(imageView);
            GridPane GridPane_1 = new GridPane();
            GridPane GridPane_2 = new GridPane();
            textArea.setPrefRowCount(1);
            textArea.setPrefWidth(500);
            textArea.setFont(Font.font(50));
            textArea.setDisable(false);
            textArea.setEditable(false);
            pane_2.setCenter(textArea);

//Below is the behavior control for the upload image button.
// I set the behavior of other buttons to be triggered after uploading images to avoid bugs.
            FileChooser.ExtensionFilter ex_1=new FileChooser.ExtensionFilter("Image Files", "*.png", "*.gif","*.jpeg");
            Button btn_0 = new Button("upload image");
            btn_0.setOnAction(new EventHandler<ActionEvent>() {
                @Override
                public void handle(ActionEvent actionEvent) {

                    FileChooser fil_chooser = new FileChooser();
                    fil_chooser.getExtensionFilters().addAll(ex_1);
                    File file = fil_chooser.showOpenDialog(new Stage());
                    if(file!=null) {
                        Image image = new Image(file.toURI().toString());
                        textArea.setText("Selected file:" + file.getPath());
                        String next_line = "\n";
                        textArea.appendText(next_line);
                        textArea.appendText("Image height: ");
                        textArea.appendText(String.valueOf(image.getHeight()));
                        textArea.appendText(next_line);
                        textArea.appendText("Image width: ");
                        textArea.appendText(String.valueOf(image.getWidth()));
                        imageView.setImage(image);
                        imageView.setFitHeight(100);
                        imageView.setFitWidth(100);
                        imageView.setPreserveRatio(true);
//The above part completes the behavior of the upload image button itself.
// The gui automatically displays thumbnails and image information.
// Next, the user can trigger the image conversion function.

//Below are the behavior controls for the remaining three buttons.
// It can complete format conversion and save the file with one click.

                        btn_1.setOnAction(e -> {
                            File inputFile = file;
                            FileChooser fil_chooser_2=new FileChooser();
                            fil_chooser_2.setInitialFileName("New_image.png");
                            File outputFile = fil_chooser_2.showSaveDialog(null);
                            if(outputFile!=null){
                                try (InputStream is = new FileInputStream(inputFile)) {
                                    BufferedImage im = ImageIO.read(is);
                                    is.close();
                                    try (OutputStream os = new FileOutputStream(outputFile)) {
                                        ImageIO.write(im, "png", os);
                                    } catch (Exception exp) {
                                        exp.printStackTrace();
                                    }
                                } catch (Exception exp) {
                                    exp.printStackTrace();
                                }
                            }
                        });

                        btn_2.setOnAction(e -> {
                            File inputFile = file;
                            FileChooser fil_chooser_2=new FileChooser();
                            fil_chooser_2.setInitialFileName("New_image.gif");
                            File outputFile = fil_chooser_2.showSaveDialog(null);
                            if(outputFile!=null){
                                try (InputStream is = new FileInputStream(inputFile)) {
                                    BufferedImage im = ImageIO.read(is);
                                    is.close();
                                    try (OutputStream os = new FileOutputStream(outputFile)) {
                                        ImageIO.write(im, "gif", os);
                                    } catch (Exception exp) {
                                        exp.printStackTrace();
                                    }
                                } catch (Exception exp) {
                                    exp.printStackTrace();
                                }
                            }
                        });

                        btn_3.setOnAction(e -> {
                            File inputFile = file;
                            FileChooser fil_chooser_2=new FileChooser();
                            fil_chooser_2.setInitialFileName("New_image.jpeg");
                            File outputFile = fil_chooser_2.showSaveDialog(null);
                            if(outputFile!=null){
                                try (InputStream is = new FileInputStream(inputFile)) {
                                    BufferedImage im = ImageIO.read(is);
                                    is.close();
                                    try (OutputStream os = new FileOutputStream(outputFile)) {
                                        ImageIO.write(im, "jpeg", os);
                                    } catch (Exception exp) {
                                        exp.printStackTrace();
                                    }
                                } catch (Exception exp) {
                                    exp.printStackTrace();
                                }
                            }
                        });
                    }
                }
            });

 //This is the layout of the button

            GridPane_2.setHgap(5);
            GridPane_2.setVgap(5);
            GridPane_2.addRow(3, btn_1, btn_2, btn_3);
            GridPane_2.addRow(4, btn_0);
            KeyBoard.getChildren().add(GridPane_1);
            KeyBoard.getChildren().add(GridPane_2);
            pane.setPadding(new Insets(10, 10, 10, 10));
            pane.setTop(pane_2);
            pane.setCenter(KeyBoard);
            pane.setBottom(box);

            return pane;
        }

        public static void main(String[] args) {
            launch();
        }
    }
}