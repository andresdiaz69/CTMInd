# Stored Procedure: sp_InformesActualizaArbol

## Usa los objetos:
- [[InformesArboles]]
- [[InformesDatosArbol]]
- [[InformesDatosArbolSpiga]]
- [[InformesLogEventos]]

```sql


-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2018-10-12
-- Description:	SP QUE ACTUALIZA LAS RAMAS DEL ARBOL Y EL DETALLE DE LAS CUENTAS USADAS
-- =======================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesActualizaArbol]

AS
BEGIN


	SET NOCOUNT ON;

-- 17 Presentacion Motorysa
-- 18 Blanace Motorysa
-- 19 Presentacion Bonaparte
-- 20 Balance Bonaparte

-- Esta variable siempre es 1 por que los Balances principales son los que estan en la empresa Casatoro

	DECLARE @Empresa int = 1

-- Cuentas que Fueron borradas en Spiga y se deben borrar en el MLC

	if exists(select * 
			from InformesDatosArbol t1 left join InformesDatosArbolSpiga t2 
			on @Empresa= t2.PkFkEmpresas and t1.Balance = t2.PkFkBalances and t1.CodigoConcepto = t2.Concepto and (t1.Cuenta = t2.PkFkContctas or (t1.Cuenta is null and t2.PkFkContctas is null))
			where (t1.Cuenta is not null and t2.PkFkContctas is null) or (t1.CodigoConcepto is not null and t2.Concepto is null)) 

	BEGIN
	
	-- Ingresa seguimiento en el log
			
			insert into InformesLogEventos (EventoOrigen,Mensaje,Balance,Concepto,Cuenta)
				select 'sp_InformesActualizaArbol','Se eliminan cuentas de InformesDatosArbol '+isnull(t1.Cuenta,''),ltrim(rtrim(cast(t1.Balance as char(3)))),ltrim(rtrim(cast(t1.CodigoConcepto as char(3)))),ltrim(rtrim(t1.Cuenta))
				from InformesDatosArbol t1 left join InformesDatosArbolSpiga t2 
				on @Empresa = t2.PkFkEmpresas and t1.Balance = t2.PkFkBalances and t1.CodigoConcepto = t2.Concepto and (t1.Cuenta = t2.PkFkContctas or (t1.Cuenta is null and t2.PkFkContctas is null))
				where (t1.Cuenta is not null and t2.PkFkContctas is null) or (t1.CodigoConcepto is not null and t2.Concepto is null)
	
	-- Retira registros

			delete from InformesDatosArbol
				from InformesDatosArbol t1 left join InformesDatosArbolSpiga t2 
				on @Empresa = t2.PkFkEmpresas and t1.Balance = t2.PkFkBalances and t1.CodigoConcepto = t2.Concepto and (t1.Cuenta = t2.PkFkContctas or (t1.Cuenta is null and t2.PkFkContctas is null))
				where (t1.Cuenta is not null and t2.PkFkContctas is null) or (t1.CodigoConcepto is not null and t2.Concepto is null)
	END
	

-- Existen nuevas Cuentas en Spiga y deben ser creadas en el MLC


	if exists(select *
		from InformesDatosArbolSpiga t1 left join InformesDatosArbol t2 
		on t1.PkFkEmpresas = @Empresa and t1.PkFkBalances = t2.Balance and t1.Concepto = t2.CodigoConcepto and (t1.PkFkContctas = t2.Cuenta or (t1.PkFkContctas is null and t2.Cuenta is null))
		where (t1.PkFkContctas is not null and t2.Cuenta is null) or (t1.Concepto is not null and t2.CodigoConcepto is null)) 

	BEGIN

	-- Ingresa seguimiento en el log

		insert into InformesLogEventos (EventoOrigen,Mensaje,Balance,Concepto,Cuenta)
			select 'sp_InformesActualizaArbol','Se inserta nuevas cuentas en InformesDatosArbol ' +isnull(t1.PkFkContctas,''),ltrim(rtrim(cast(t1.PkFkBalances as char(3)))),ltrim(rtrim(cast(t1.Concepto as char(3)))),ltrim(rtrim(t1.PkFkContctas))		
			from InformesDatosArbolSpiga t1 left join InformesDatosArbol t2 
			on t1.PkFkEmpresas = 1 and t1.PkFkBalances = t2.Balance and t1.Concepto = t2.CodigoConcepto and (t1.PkFkContctas = t2.Cuenta or (t1.PkFkContctas is null and t2.Cuenta is null))
			where (t1.PkFkContctas is not null and t2.Cuenta is null) or (t1.Concepto is not null and t2.CodigoConcepto is null)

	-- Ingresa Registros

		insert into InformesDatosArbol
			select t1.PkFkempresas,t1.PkFkBalances,t1.NombreBalance,t1.Concepto,t1.NombreConcepto,t1.PkFkContctas,t1.NombreCuenta, 
			getdate() FechaAlta
			from InformesDatosArbolSpiga t1 left join InformesDatosArbol t2 
			on t1.PkFkEmpresas = 1 and t1.PkFkBalances = t2.Balance and t1.Concepto = t2.CodigoConcepto and (t1.PkFkContctas = t2.Cuenta or (t1.PkFkContctas is null and t2.Cuenta is null))
			where (t1.PkFkContctas is not null and LEN(t1.PkFkContctas)=10 and t2.Cuenta is null) or (t1.Concepto is not null and t2.CodigoConcepto is null)
			group by t1.PkFkempresas,t1.PkFkBalances,t1.NombreBalance,t1.Concepto,t1.NombreConcepto,t1.PkFkContctas,t1.NombreCuenta

	END
	
-- Existen nuevas Ramas en Spiga y deben ser creadas en el MLC


	if exists(Select *    
			from InformesDatosArbol t1 left join InformesArboles t2 on t1.Balance = t2.Balance and t1.CodigoConcepto = t2.CodigoConcepto
			where t2.Empresa is null and ((t1.Balance = 17 and t1.CodigoConcepto not in (64,98,94,185)) or (t1.Balance = 18 and t1.CodigoConcepto not in (8,9,10,12,13,14,15,16,17,19,20,21,22,23,24,25,26)))) 
	
	BEGIN

	-- Ingresa seguimiento en el log

		insert into InformesLogEventos (EventoOrigen,Mensaje,Balance,Concepto)
			Select  'sp_InformesActualizaArbol','Se inserta nuevas ramas en InformesArboles '+isnull(t1.NombreConcepto,''),t1.Balance,t1.CodigoConcepto    
			from InformesDatosArbol t1 left join InformesArboles t2 on t1.Balance = t2.Balance and t1.CodigoConcepto = t2.CodigoConcepto
			where t2.Empresa is null and ((t1.Balance = 17 and t1.CodigoConcepto not in (64,98,94,185)) or (t1.Balance = 18 and t1.CodigoConcepto not in (8,9,10,12,13,14,15,16,17,19,20,21,22,23,24,25,26)))
			group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.CodigoConcepto
			order by t1.Balance,t1.CodigoConcepto

	-- Ingresa Registros

		insert into InformesArboles
			Select 0,t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,0 Nivel1,0 Nivel2,0 Nivel3,0 Nivel4,0 Nivel5,rank() OVER (ORDER BY t1.Balance,t1.CodigoConcepto) Nivel6,0 Orden,t1.CodigoConcepto ConceptoPresupuesto,'D' DebeHaber,'','',0    
			from InformesDatosArbol t1 left join InformesArboles t2 on t1.Balance = t2.Balance and t1.CodigoConcepto = t2.CodigoConcepto
			where t2.Empresa is null and ((t1.Balance = 17 and t1.CodigoConcepto not in (64,98,94,185)) or (t1.Balance = 18 and t1.CodigoConcepto not in (8,9,10,12,13,14,15,16,17,19,20,21,22,23,24,25,26)))
			group by t1.Balance,t1.CodigoConcepto,t1.NombreConcepto,t1.CodigoConcepto
			order by t1.Balance,t1.CodigoConcepto

	END

-- Se eliminaron ramas en Spiga y deben ser borradas en el MLC


	if exists(Select t1.Balance,t1.CodigoConcepto ,t2.CodigoConcepto     
				from InformesArboles t1 left join InformesDatosArbol t2 on t1.Balance = t2.Balance and t1.CodigoConcepto = t2.CodigoConcepto
				where t2.Empresa is null and t1.CodigoConcepto < 30000)
	
	BEGIN

	-- Ingresa seguimiento en el log


		insert into InformesLogEventos (EventoOrigen,Mensaje,Balance,Concepto)
			Select 'sp_InformesActualizaArbol','Se eliminan ramas en InformesArboles -  '+isnull(t1.NombreConcepto,''),t1.Balance,t1.CodigoConcepto  
			from InformesArboles t1 left join InformesDatosArbol t2 on t1.Balance = t2.Balance and t1.CodigoConcepto = t2.CodigoConcepto
			where t2.Empresa is null and t1.CodigoConcepto < 30000


	-- Se retiran Registros

		delete InformesArboles
			from InformesArboles t1 left join InformesDatosArbol t2 on t1.Balance = t2.Balance and t1.CodigoConcepto = t2.CodigoConcepto
			where t2.Empresa is null and t1.CodigoConcepto < 30000

	END


END



```
