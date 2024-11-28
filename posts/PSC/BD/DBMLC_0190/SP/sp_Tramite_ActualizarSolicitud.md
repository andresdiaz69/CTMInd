# Stored Procedure: sp_Tramite_ActualizarSolicitud

## Usa los objetos:
- [[Tramite_Solicitud]]

```sql

CREATE PROCEDURE [dbo].[sp_Tramite_ActualizarSolicitud]
@IdTramite			 int,
@IdDepartamento		 int,
@NombreDepartamento  VARCHAR(150),
@IdMunicipio		 int,
@NombreMunicipio	 VARCHAR(150),
@TipoPlaca			 VARCHAR(50),
@ObservacionPlaca	 VARCHAR(200),
@PlacaTerminadaEn	 VARCHAR(50),
@Placa				 VARCHAR(50)



AS
BEGIN

UPDATE Tramite_Solicitud
   SET IdDepartamento	 = @IdDepartamento,    NombreDepartamento = @NombreDepartamento, 
	   IdMunicipio		 = @IdMunicipio,	   NombreMunicipio    = @NombreMunicipio,
	   TipoPlaca		 = @TipoPlaca,		   ObservacionesPlaca = @ObservacionPlaca,
	   PlacaTerminadasEn = @PlacaTerminadaEn,  Placa			  = @Placa
 WHERE IdTramite	  = @IdTramite
   END

```
