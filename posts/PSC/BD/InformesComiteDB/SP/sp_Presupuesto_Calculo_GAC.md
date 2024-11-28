# Stored Procedure: sp_Presupuesto_Calculo_GAC

## Usa los objetos:
- [[Presupuestos_calculo_Gac]]
- [[vw_GAC_Activos_Operativos_Presupuesto]]
- [[vw_GAC_Empleados_Por_Linea_Presupuesto]]
- [[vw_GAC_Facturas_Emitidas_Recibidas_Presupuesto]]
- [[vw_GAC_Numero_Sedes_Presupuesto]]
- [[vw_presupuestoGacXLineaCentro]]

```sql
-- =============================================
-- Author:		Manuel Suarez
-- Create date: 081124
-- Description:	se crea en el proyecto de presupuestos para consolidar el GAC.

-- =============================================
CREATE PROCEDURE [dbo].[sp_Presupuesto_Calculo_GAC]
--	-- Add the parameters for the stored procedure here
--@linea int,
--	@centro int,
--	@idclase int,
--	@anio int 

AS
--declare @linea int =19;
--declare @anio  int =2025
--declare @idClase int =1
--declare @centro  int =1
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	 IF OBJECT_ID('tempdb.dbo.#Calculo', 'U') IS NOT NULL
                DROP TABLE #Calculo;
	Declare @TotalSede int


	Create table #Calculo
	(
	CodigoLinea int NOT NULL,
	codigoCentro int not null,
	idclase smallint,
	AnoPeriodo int Not null,
	MesPeriodo int,
	trimestre varchar(10) null,
	NumeroFacturas decimal(18,2) null,
	NumeroPersonas decimal(18,2) null,
    NumeroOficinas decimal(18,2) null,
	activos decimal (18,2) null,
	Peso_Promedio decimal(18,2) null)
	
	--Procentaje de Facturas
	Insert into #Calculo 
	select distinct CodUnidadNegocio,  i.CodigoCentro,i.idclase,p.ano_Periodo+1 ano_Periodo,0 as MesPeriodo,
	substring(p.trimestre,1,1) as Trimestre,p.porcentaje,0,0,0 ,0
	  from vw_GAC_Facturas_Emitidas_Recibidas_Presupuesto p
	  inner join vw_presupuestoGacXLineaCentro i on i.Ano_periodo = p.Ano_Periodo+1
											   and i.trimestre   = substring(p.trimestre,1,1)
											   and i.CodigoLinea = CodUnidadNegocio											   
											   
	-- where CodUnidadNegocio = @linea 
	 

	--drop table 
 --#Calculo

	--Porcentaje de Personas
  Update #Calculo	
	 set NumeroPersonas = isnull(porcentaje,0)
	from vw_GAC_Empleados_Por_Linea_Presupuesto as a, #Calculo as b
   where a.CodUnidadNegocio = b.CodigoLinea 
	 and a.Ano+1=b.AnoPeriodo 
	 and substring(a.trimestre,1,1)=b.trimestre
	 and a.CodUnidadNegocio = b.CodigoLinea


----Numero de Oficinas

select @TotalSede=(sum (numerosedes)) from [dbo].[vw_GAC_Numero_Sedes_Presupuesto]  


		select Ano,CodUnidadNegocio,sum (numerosedes) as Sedes,@TotalSede as total
		into #tempgac from [dbo].[vw_GAC_Numero_Sedes_Presupuesto]
		group by Ano,CodUnidadNegocio


		Update #Calculo
		set NumeroOficinas = convert(decimal(10,1),(convert(decimal(10,2),Sedes)/total)*100) 
		from #tempgac as a, #Calculo as b
		where a.CodUnidadNegocio = b.CodigoLinea 
		 and a.Ano+1=b.AnoPeriodo 
		 and a.CodUnidadNegocio = b.CodigoLinea

		Drop table #tempgac


-----Activos operativos
	Update #Calculo	
	 set activos = isnull(porcentaje,0)
	from vw_GAC_Activos_Operativos_Presupuesto as a, #Calculo as b
   where a.CodUnidadNegocio = b.CodigoLinea 
	 and a.Ano_Periodo+1=b.AnoPeriodo 
	 and substring(a.trimestre,1,1)=b.trimestre
	 and a.CodUnidadNegocio = b.CodigoLinea

--calculo peso_promedio

   --Update #Calculo
   --set peso_promedio = isnull(((a.NumeroFacturas+a.NumeroPersonas+Numero_Oficinas+activos/1000)/4)*@GAC,0)
   --from #Calculo a
   --where CodigoLinea =@linea

    BEGIN TRAN;
    BEGIN TRY
--select * from #Calculo 

   MERGE INTO Presupuestos_calculo_Gac pv
            USING #Calculo tv   ON pv.AnoPeriodo    = tv.AnoPeriodo 
			                   and pv.CodigoLinea   = tv.CodigoLinea
			                   and pv.CodigoCentro  = tv.CodigoCentro
			                   and pv.Trimestre     = tv.Trimestre
							   and pv.idclase       = tv.idclase
             WHEN MATCHED THEN
                  UPDATE SET pv.Facturas = tv.NumeroFacturas,
                             pv.Personas = tv.NumeroPersonas,
                             pv.Oficinas = tv.NumeroOficinas,
                             pv.Activos  = tv.Activos
             WHEN NOT MATCHED THEN
                  INSERT (CodigoLinea,CodigoCentro ,AnoPeriodo, MesPeriodo ,Trimestre ,IdClase ,Facturas ,
                          Personas,Oficinas ,Activos,Promedio ,Ingresos ,ValorGac)
                  VALUES (tv.CodigoLinea, tv.CodigoCentro, tv.AnoPeriodo,MesPeriodo, tv.Trimestre, tv.IdClase, 
                          tv.NumeroFacturas, tv.NumeroPersonas, tv.NumeroOficinas, tv.Activos, 0,0,0  );

            drop table #Calculo
        
        -- Confirmar transacción
        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        CLOSE CodigosMarcasCursor;
        DEALLOCATE CodigosMarcasCursor;
        THROW;
    END CATCH;

END



```
