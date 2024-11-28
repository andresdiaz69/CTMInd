# Stored Procedure: sp_Presupuestos_PromedioPrecio_PorModelo

## Usa los objetos:
- [[vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_PromedioPrecio_PorModelo] (
    @CodigoLinea smallint,
	@Ano_Periodo smallint,
	@idClase     smallint
) AS   

BEGIN
	-- =============================================
	-- Control de Cambios
	-- 2024|10|16 - Manuel Suarez - Alter SP donde se agrega filtro para poder consultar las diferentes clases y no solo base.
	-- 2024|10|28 - Wilder Chacón - Se agrega las columnas de Categoria Maquinaria
	-- 2024|10|29 - Alexis Barreto - Se agregan las columnas Porcentaje_Consignacion, UsadosConsignacion y Precio
	-- Modulo - Presupuestos
	-- =============================================
	
	SET NOCOUNT ON
	SET FMTONLY OFF

	SELECT CodigoLinea,					Linea,					CodigoGama,		Gama,  
			CodigoModelo,				Modelo,					(PrecioSinImpuestos / 1000) AS PrecioSinImpuestos, 
			IdCategoriaMaquinaria,		NombreCategoria,		Inflacion,
			Ano_Periodo,				Enero,					Febrero,
			Marzo,						Abril,					Mayo,			
			Junio,						Julio,					Agosto,
			Septiembre,					Octubre,				Noviembre,
			Diciembre,					AplicaPresupuesto,		Porcentaje_Consignacion, 
			UsadosConsignacion,			Precio
	FROM vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos
	WHERE CodigoLinea = @CodigoLinea
		and Ano_Periodo = @Ano_Periodo
		and idclase     = @idClase

END

```
