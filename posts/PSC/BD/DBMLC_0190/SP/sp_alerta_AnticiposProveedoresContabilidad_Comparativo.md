# Stored Procedure: sp_alerta_AnticiposProveedoresContabilidad_Comparativo

## Usa los objetos:
- [[spiga_Terceros]]
- [[vw_alerta_AnticiposProveedores]]
- [[vw_alerta_ContabilidadMovimientos]]

```sql
CREATE PROCEDURE [dbo].[sp_alerta_AnticiposProveedoresContabilidad_Comparativo] 
	-- Add the parameters for the stored procedure here
	@Ano_Periodo AS int, 
	@Mes_Periodo AS int,
	@CodigoEmpresa AS smallint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


SELECT iSNULL(ANTICIPOS.Ano_Periodo, CONTABILIDAD.Ano_Periodo) AS Ano_Periodo, 
       ISNULL(ANTICIPOS.Mes_Periodo, CONTABILIDAD.Mes_Periodo) AS Mes_Periodo, 
       ISNULL(ANTICIPOS.CodigoEmpresa, CONTABILIDAD.CodigoEmpresa) AS CodigoEmpresa, 
       ISNULL(ANTICIPOS.NombreEmpresa, CONTABILIDAD.NombreEmpresa) AS NombreEmpresa,
       ISNULL(ANTICIPOS.SiglaEmpresa, CONTABILIDAD.SiglaEmpresa) AS SiglaEmpresa,
       ISNULL(ANTICIPOS.CodigoCentro, CONTABILIDAD.CodigoCentro) AS CodigoCentro,
       ISNULL(ANTICIPOS.NombreCentro, CONTABILIDAD.NombreCentro) AS NombreCentro,
       ISNULL(ANTICIPOS.CodigoTercero, CONTABILIDAD.CodigoTercero) AS CodigoTercero, 
       ISNULL(ANTICIPOS.NombreTercero, (SELECT Nombre + ISNULL(Apellido1, '') + ISNULL(Apellido2, '') 
	                                      FROM [PSCService_DB]..spiga_Terceros
										 WHERE (PkTerceros = CONTABILIDAD.CodigoTercero) 
										)) AS NombreTercero, 
       ISNULL(ANTICIPOS.TerceroCompleto, CAST(CONTABILIDAD.CodigoTercero AS NVARCHAR(10)) + ' - ' + (SELECT  Nombre + ISNULL(Apellido1, '') + ISNULL(Apellido2, '') 
	                                                                                                   FROM [PSCService_DB]..spiga_Terceros 
																									  WHERE (PkTerceros = CONTABILIDAD.CodigoTercero))) AS TerceroCompleto, 
       ISNULL(CONTABILIDAD.Concepto, '') AS Concepto, 
       ISNULL(ANTICIPOS.SaldoPendientePorVincular, 0) AS SaldoPendientePorVincular, 
       (ISNULL(CONTABILIDAD.SaldoContabilidad, 0)) AS SaldoContabilidad,
       ISNULL(ANTICIPOS.SaldoPendientePorVincular, 0) - (ISNULL(CONTABILIDAD.SaldoContabilidad, 0)) AS Diferencia
  FROM (SELECT Ano_Periodo, Mes_Periodo, CodigoEmpresa, NombreEmpresa, SiglaEmpresa, CodigoTercero, NombreTercero, TerceroCompleto, CodigoCentro, NombreCentro, SaldoPendientePorVincular
          FROM dbo.vw_alerta_AnticiposProveedores
         WHERE (Ano_Periodo =@Ano_Periodo) 
		   AND (Mes_Periodo = @Mes_Periodo) 
		   AND (CodigoEmpresa = @CodigoEmpresa)
 	   ) AS ANTICIPOS FULL OUTER JOIN
     (SELECT Ano_Periodo, @Mes_Periodo AS Mes_Periodo, CodigoEmpresa, NombreEmpresa, SiglaEmpresa, CodigoTercero, SUM(SaldoContabilidad) AS SaldoContabilidad, MAX(Concepto) AS Concepto, CodigoCentro, MAX(NombreCentro) AS NombreCentro
        FROM dbo.vw_alerta_ContabilidadMovimientos
       WHERE (Cuenta IN ('1330050505', '1330200000')) 
	     AND (Ano_Periodo =@Ano_Periodo)
		 AND (Mes_Periodo <= @Mes_Periodo) 
		 AND (CodigoEmpresa = @CodigoEmpresa)
       GROUP BY Ano_Periodo, CodigoEmpresa, NombreEmpresa, SiglaEmpresa, CodigoTercero, CodigoCentro
	  ) AS CONTABILIDAD ON ANTICIPOS.CodigoCentro = CONTABILIDAD.CodigoCentro 
	                   AND ANTICIPOS.CodigoTercero = CONTABILIDAD.CodigoTercero 
					   AND ANTICIPOS.CodigoEmpresa = CONTABILIDAD.CodigoEmpresa
					   AND ANTICIPOS.Mes_Periodo = CONTABILIDAD.Mes_Periodo 
					   AND ANTICIPOS.Ano_Periodo = CONTABILIDAD.Ano_Periodo


END

```