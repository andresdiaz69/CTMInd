# Stored Procedure: Sp_Provision_Compania

## Usa los objetos:
- [[EmpresasCentrosSecciones]]
- [[Provision_OT_Resultado]]
- [[VehiculosMarcas]]

```sql

CREATE PROCEDURE Sp_Provision_Compania

@FECHA DATETIME

AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF 

	DECLARE 
		@MESNUMERO INT,
		@MESPALABRA NVARCHAR(255)

	SET @MESNUMERO = MONTH(@FECHA)

	IF (@MESNUMERO = 1) SET @MESPALABRA = 'ENERO'
	IF (@MESNUMERO = 2) SET @MESPALABRA = 'FEBRERO'
	IF (@MESNUMERO = 3) SET @MESPALABRA = 'MARZO'
	IF (@MESNUMERO = 4) SET @MESPALABRA = 'ABRIL'
	IF (@MESNUMERO = 5) SET @MESPALABRA = 'MAYO'
	IF (@MESNUMERO = 6) SET @MESPALABRA = 'JUNIO'
	IF (@MESNUMERO = 7) SET @MESPALABRA = 'JULIO'
	IF (@MESNUMERO = 8) SET @MESPALABRA = 'AGOSTO'
	IF (@MESNUMERO = 9) SET @MESPALABRA = 'SEPTIEMBRE'
	IF (@MESNUMERO = 10) SET @MESPALABRA = 'OCTUBRE'
	IF (@MESNUMERO = 11) SET @MESPALABRA = 'NOVIEMBRE'
	IF (@MESNUMERO = 12) SET @MESPALABRA = 'DICIEMBRE'
		
	SELECT		'Fecha Asiento' = CONVERT(NVARCHAR(255), FORMAT( R.Fecha, 'yyyyMMdd')), 
				'Tipo Asiento' = 'OV', 
				'Concepto Asiento' = 'PROV OTS CIERRE ' + @MESPALABRA, 
				'Tipo de operacion' = '', 
				'Cuenta' = R.Cuentas, 
				'Debe/Haber' = R.Naturaleza, 
				'Importe' = CONVERT(DECIMAL(16,0), ABS(R.VrProvision)), 
				'Entidad' = '', 
				'Tercero' = CASE 
								WHEN R.IdEmpresa = 1 THEN 2
								WHEN R.IdEmpresa = 3 THEN 4
								WHEN R.IdEmpresa = 5 THEN 19377
								WHEN R.IdEmpresa = 6 THEN 249195
							END,  
				'Cuenta Bancaria' = '', 
				'Centro' = R.IdCentro, 
				'Departamento' = E.CodigoDepartamento,
				'Seccion' = R.IdSeccion, 
				'Marca' = CASE	WHEN (
										SELECT V.CodigoMarca 
										FROM	VehiculosMarcas V 
										WHERE	V.CodigoMarcaSpigaValido <> 0 AND V.CodigoMarca = R.IdMarca) IS NOT NULL AND R.Departamento NOT LIKE '%ALISTAMIENTO%'
								THEN R.IdMarca 
								ELSE 0 END,
				'Gama' = '', 
				'MR' = '', 
				'Clasificacion1' = '', 
				'Referencia' = '', 
				'Canal de Venta' = '', 
				'Canal de Compra' = '', 
				'Concepto Bancario' = '', 
				'Moneda' = '', 
				'Factor Cambio' = '' 
	FROM		Provision_OT_Resultado R, EmpresasCentrosSecciones E
	WHERE		R.VrProvision <> 0 AND 
				(R.IdEmpresa = E.CodigoEmpresa AND R.IdCentro = E.CodigoCentro AND R.IdSeccion = E.CodigoSeccion)
	ORDER BY	R.IdCentro, R.IdSeccion, R.IdMarca
END

```
