# Stored Procedure: sp_Spiga_MovimientoContableTercero

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
CREATE PROCEDURE [dbo].[sp_Spiga_MovimientoContableTercero] 
(
	@Empresa int,
	@FechaInicial date,
	@FechaFinal date,
	@Cuenta varchar(255)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
select   cant= row_number() over (partition by CodigoTercero order by CodigoTercero),fechaasiento,Empresa,NombreEmpresa,Cuenta,CodigoTercero,Debe=sum(debe), 
Haber=sum(haber),saldo= sum(debe)-sum(haber),Centro,NombreCentro​,Seccion,NombreSeccion,Departamento,NombreDepartamento,Marca,NombreMarca
from(​
		select	Empresa=a.idEmpresas,a.NombreEmpresa,a.Cuenta,a.CodigoTercero,a.FechaAsiento,
		a.NumeroAsiento,a.Factura,a.FechaFactura,a.TipoFactura,a.ReferenciaInterna,Debe=convert(money,a.Debe),Haber=convert(money,a.haber),a.concepto,a.FacturaConciliacion,
		a.ExpedienteConciliacion,a.Centro,a.NombreCentro,a.Seccion,a.NombreSeccion,a.Departamento,a.NombreDepartamento,a.IdCtaBancarias,
		a.CuentaBancaria,a.Marca,a.NombreMarca
		FROM		[PSCService_DB].dbo.spiga_ContabilidadMovimientos 	a	 with(nolock)	
		WHERE a.IdEmpresas = @Empresa
		and ​a.FechaAsiento between @FechaInicial and @FechaFinal
		and cuenta = @Cuenta
)a
group by Empresa,NombreEmpresa,Cuenta,CodigoTercero,Centro,NombreCentro​,Seccion,NombreSeccion,Departamento,NombreDepartamento,Marca,NombreMarca,fechaasiento

END

```
